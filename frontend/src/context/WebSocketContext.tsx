/**
 * WebSocketContext.tsx
 *
 * Centralized WebSocket connection provider.
 * Establishes a single persistent WS connection at the app root level and 
 * shares it to all consumers via React context. Handles:
 *  - Auto-connection on login
 *  - Auto-reconnection with exponential backoff on disconnect
 *  - Named event subscriptions (consumers register a callback for event types)
 *  - Cleanup on logout
 */

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { api } from '../services/api';

// Event listener signature
export type WSEventHandler = (data: any) => void;

interface WebSocketContextValue {
  /** Whether the WS connection is currently open */
  isConnected: boolean;
  /** Subscribe to a specific event name. Returns an unsubscribe function. */
  subscribe: (event: string, handler: WSEventHandler) => () => void;
  /** Send a message over the WebSocket connection */
  sendMessage: (data: any) => void;
}

const WebSocketContext = createContext<WebSocketContextValue>({
  isConnected: false,
  subscribe: () => () => {},
  sendMessage: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  /** JWT token — pass null/undefined when logged out */
  token: string | null;
  children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ token, children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectDelayRef = useRef(2000);
  // Map of eventName -> Set of handlers
  const handlersRef = useRef<Map<string, Set<WSEventHandler>>>(new Map());
  const isMountedRef = useRef(true);

  const buildWsUrl = useCallback((): string => {
    const apiBase = api.defaults.baseURL || '';
    if (apiBase.startsWith('http')) {
      try {
        const parsed = new URL(apiBase);
        const proto = parsed.protocol === 'https:' ? 'wss:' : 'ws:';
        return `${proto}//${parsed.host}/api/v1/notifications/ws`;
      } catch {
        const cleaned = apiBase.replace(/^https?:\/\//i, '');
        const proto = apiBase.startsWith('https') ? 'wss:' : 'ws:';
        return `${proto}//${cleaned}/api/v1/notifications/ws`;
      }
    }
    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${proto}//${window.location.hostname || '127.0.0.1'}:3001/api/v1/notifications/ws`;
  }, []);

  const connect = useCallback(() => {
    if (!token || !isMountedRef.current) return;

    if (wsRef.current && wsRef.current.readyState < WebSocket.CLOSING) {
      wsRef.current.close();
    }

    const wsUrl = buildWsUrl();
    const ws = new WebSocket(wsUrl, token);
    wsRef.current = ws;

    ws.onopen = () => {
      if (!isMountedRef.current) return;
      setIsConnected(true);
      reconnectDelayRef.current = 2000; // Reset backoff
      console.log('[WS] Connected to Real-Time Notification Server');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const eventName: string = data.event || '__raw__';

        // Dispatch to any handlers subscribed to this specific event
        const handlers = handlersRef.current.get(eventName);
        if (handlers) handlers.forEach(h => h(data));

        // Always dispatch to wildcard listeners too
        const wildcard = handlersRef.current.get('*');
        if (wildcard) wildcard.forEach(h => h(data));
      } catch (err) {
        console.error('[WS] Failed to parse message:', err);
      }
    };

    ws.onclose = () => {
      if (!isMountedRef.current) return;
      setIsConnected(false);
      if (token) {
        // Exponential backoff, cap at 30s
        const delay = Math.min(reconnectDelayRef.current, 30000);
        reconnectDelayRef.current = delay * 1.5;
        console.log(`[WS] Disconnected. Reconnecting in ${delay}ms...`);
        reconnectTimeoutRef.current = setTimeout(connect, delay);
      }
    };

    ws.onerror = (err) => {
      console.warn('[WS] Connection error:', err);
    };
  }, [token, buildWsUrl]);

  // Establish / tear down connection when token changes
  useEffect(() => {
    isMountedRef.current = true;

    if (token) {
      connect();
    } else {
      // Logged out — clean up
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      setIsConnected(false);
    }

    return () => {
      isMountedRef.current = false;
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [token, connect]);

  /**
   * Subscribe to a named event. Returns an unsubscribe function.
   * Use event name '*' to receive all events.
   */
  const subscribe = useCallback((event: string, handler: WSEventHandler): (() => void) => {
    if (!handlersRef.current.has(event)) {
      handlersRef.current.set(event, new Set());
    }
    handlersRef.current.get(event)!.add(handler);

    return () => {
      handlersRef.current.get(event)?.delete(handler);
    };
  }, []);

  const sendMessage = useCallback((data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(typeof data === 'string' ? data : JSON.stringify(data));
    } else {
      console.warn('[WS] Cannot send message: connection is not open');
    }
  }, []);

  useEffect(() => {
    (window as any).__mockWsMessage = (eventName: string, payload: any) => {
      const data = { event: eventName, ...payload };
      
      const handlers = handlersRef.current.get(eventName);
      if (handlers) handlers.forEach(h => h(data));

      const wildcard = handlersRef.current.get('*');
      if (wildcard) wildcard.forEach(h => h(data));
    };
    return () => {
      delete (window as any).__mockWsMessage;
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, subscribe, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
