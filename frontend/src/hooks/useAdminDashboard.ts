import { useCallback,useEffect,useState } from 'react';
import { adminService,SystemAuditLog,SystemStats,TraineeProgress } from '../services/adminService';
import { authService,User } from '../services/authService';
import { parseBackendError } from '../utils/errorUtils';

export const useAdminDashboard = (activeTab: string) => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [progress, setProgress] = useState<TraineeProgress[]>([]);
  const [logs, setLogs] = useState<SystemAuditLog[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState<TraineeProgress | null>(null);
  const [heatmap, setHeatmap] = useState<{ course_id: string; count: number }[]>([]);

  // User CRUD state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!currentUser) {
        const me = await authService.getCurrentUser();
        setCurrentUser(me);
      }

      if (activeTab === 'overview') {
        const [s, h] = await Promise.all([
          adminService.getStats(),
          adminService.getHeatmap()
        ]);
        setStats(s);
        setHeatmap(h);
      } else if (activeTab === 'users') {
        const u = await authService.getUsers();
        setUsers(u);
      } else if (activeTab === 'progress') {
        const p = await adminService.getTraineeProgress();
        setProgress(p);
        // Update selected trainee if open
        if (selectedTrainee) {
          const updated = p.find(t => t.id === selectedTrainee.id);
          if (updated) setSelectedTrainee(updated);
        }
      } else if (activeTab === 'logs') {
        const l = await adminService.getLogs();
        setLogs(l);
      }
    } catch (err: any) {
      setError(parseBackendError(err, 'Failed to load data.'));
    } finally {
      setLoading(false);
    }
  }, [activeTab, selectedTrainee, currentUser]);

  // Trigger data fetching on mount and when tab changes
  useEffect(() => {
    fetchData();
    if (activeTab !== 'progress') setSelectedTrainee(null);
  }, [activeTab]);

  useEffect(() => {
    const handleGlobalRefresh = () => {
      fetchData();
    };
    window.addEventListener('kmti-global-refresh', handleGlobalRefresh);
    return () => window.removeEventListener('kmti-global-refresh', handleGlobalRefresh);
  }, [fetchData]);


  const handleSaveUser = useCallback(async (userData: any) => {
    try {
      if (selectedUser) {
        await adminService.updateUser(selectedUser.id, userData);
      } else {
        await adminService.createUser(userData);
      }
      await fetchData();
      setIsUserModalOpen(false);
    } catch (err: any) {
      throw err; // Propagate to modal for display
    }
  }, [selectedUser, fetchData]);

  const handleExport = useCallback(async (userId?: number) => {
    try {
      await adminService.downloadProgressExport(userId);
    } catch (err) {
      setError('Export failed.');
    }
  }, []);

  return {
    stats,
    users,
    progress,
    logs,
    currentUser,
    loading,
    error,
    setError,
    searchQuery,
    setSearchQuery,
    selectedTrainee,
    setSelectedTrainee,
    heatmap,
    isUserModalOpen,
    setIsUserModalOpen,
    selectedUser,
    setSelectedUser,
    fetchData,
    handleSaveUser,
    handleExport
  };
};
