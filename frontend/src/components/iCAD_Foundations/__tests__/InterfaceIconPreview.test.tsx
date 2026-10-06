import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import InterfaceIconPreview from '../InterfaceIconPreview';
import { interfaceIconRegion } from '../interfaceIconLocations';

function openPreview(toolbar = false) {
  const title = toolbar ? 'File' : 'Title Bar';
  render(<InterfaceIconPreview index={0} toolbar={toolbar} title={title} japanese={false} />);
  fireEvent.click(screen.getByRole('button', { name: `Enlarge: ${title}` }));
  const dialog = screen.getByRole('dialog', { name: title });
  const image = within(dialog).getByRole('img', { name: 'Full iCAD SX interface' });
  const stage = dialog.querySelector('[data-phase]')!;
  return { dialog, image, stage };
}

function advance(milliseconds: number) {
  act(() => { vi.advanceTimersByTime(milliseconds); });
  // Focus changes queue a zero-delay event in jsdom after React's effects run.
  act(() => { vi.advanceTimersByTime(0); });
}

const restoreFullscreen: Array<() => void> = [];
function mockFullscreen(initial: Element | null = null) {
  let element = initial;
  const replace = (target: object, key: string, descriptor: PropertyDescriptor) => {
    const previous = Object.getOwnPropertyDescriptor(target, key);
    Object.defineProperty(target, key, { configurable: true, ...descriptor });
    restoreFullscreen.push(() => { if (previous) Object.defineProperty(target, key, previous); else Reflect.deleteProperty(target, key); });
  };
  const change = (next: Element | null) => { element = next; document.dispatchEvent(new Event('fullscreenchange')); };
  const enter = vi.fn(async () => change(document.documentElement));
  const exit = vi.fn(async () => change(null));
  replace(document, 'fullscreenElement', { get: () => element });
  replace(document.documentElement, 'requestFullscreen', { value: enter });
  replace(document, 'exitFullscreen', { value: exit });
  return { enter, exit, change };
}

describe('Interface icon location preview', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) { this.open = true; });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) { this.open = false; });
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    document.body.style.overflow = 'auto';
  });

  afterEach(() => {
    cleanup();
    restoreFullscreen.splice(0).reverse().forEach(restore => restore());
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.body.style.overflow = '';
  });

  it('keeps standalone artwork open without exposing the source screenshot', () => {
    render(<InterfaceIconPreview index={0} toolbar={false} title="Section" japanese={false} custom={{artwork:<svg role="img" aria-label="Section diagram" />, artworkOnly:true, screen:'source.png', region:{bounds:[0,0,100,100],landing:[0,0,100,100]}}} />);
    fireEvent.click(screen.getByRole('button', {name:'Enlarge: Section'}));
    const dialog = screen.getByRole('dialog', {name:'Section'});
    advance(10000);
    expect(within(dialog).getByRole('img', {name:'Section diagram'})).toBeInTheDocument();
    expect(dialog.querySelector('img')).toBeNull();
    expect(within(dialog).queryByRole('button', {name:'Show location'})).not.toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('button', {name:'Close enlarged icon'}));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('shows screenshot previews immediately after loading without the icon-placement delay', () => {
    render(<InterfaceIconPreview index={0} toolbar={false} title="Result" japanese={false} custom={{artwork:<svg />,screen:'instant-result.png',screenFit:'comfortable',region:{bounds:[0,0,1920,1080],landing:[0,0,1920,1080]}}} />);
    fireEvent.click(screen.getByRole('button', {name:'Enlarge: Result'}));
    const dialog=screen.getByRole('dialog');
    expect(within(dialog).getByRole('status')).toHaveTextContent('Loading image');
    expect(dialog).toHaveAttribute('data-phase','enlarged');
    fireEvent.load(within(dialog).getByRole('img',{name:'Full iCAD SX interface'}));
    expect(dialog).toHaveAttribute('data-phase','located');
  });

  it('preloads a shared screenshot when a card approaches the viewport, before opening', () => {
    let notify!: IntersectionObserverCallback;
    const disconnect=vi.fn();
    const observe=vi.fn();
    vi.stubGlobal('IntersectionObserver',class {
      constructor(callback:IntersectionObserverCallback){notify=callback;}
      observe=observe;
      disconnect=disconnect;
    });
    const images: {src:string;decoding:string}[]=[];
    vi.stubGlobal('Image',class {
      src='';decoding='';
      constructor(){images.push(this);}
    });
    render(<InterfaceIconPreview index={0} toolbar={false} title="Preload" japanese={false} custom={{artwork:<svg />,screen:'unique-preload.png',region:{bounds:[0,0,10,10],landing:[0,0,10,10]}}} />);
    expect(images).toHaveLength(0);
    act(()=>notify([{isIntersecting:true} as IntersectionObserverEntry],{} as IntersectionObserver));
    expect(images).toHaveLength(1);
    expect(images[0].src).toBe('unique-preload.png');
    expect(disconnect).toHaveBeenCalled();
    fireEvent.focus(screen.getByRole('button',{name:'Enlarge: Preload'}));
    expect(images).toHaveLength(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it.each([false, true])('waits for the actual interface image before locating a toolbar=%s icon', (toolbar) => {
    const { dialog, image, stage } = openPreview(toolbar);
    expect(within(dialog).getByRole('button', { name: 'Show location' })).toBeDisabled();
    advance(10000);
    expect(stage).toHaveAttribute('data-phase', 'enlarged');

    fireEvent.load(image);
    expect(within(dialog).getByRole('button', { name: 'Show location' })).toBeEnabled();
    advance(999);
    expect(stage).toHaveAttribute('data-phase', 'enlarged');
    advance(1);
    expect(stage).toHaveAttribute('data-phase', 'moving');
    expect(within(dialog).queryByRole('button', { name: 'Replay' })).not.toBeInTheDocument();
    advance(1000);
    expect(stage).toHaveAttribute('data-phase', 'located');
    expect(dialog.querySelector('.foundation-interface-preview-panel')).toBeNull();
    expect(within(dialog).queryByRole('button')).not.toBeInTheDocument();
  });

  it('can show the location immediately with no controls over the screenshot and close on click', () => {
    const { dialog, image, stage } = openPreview();
    fireEvent.load(image);
    advance(400);
    fireEvent.click(within(dialog).getByRole('button', { name: 'Show location' }));
    expect(stage).toHaveAttribute('data-phase', 'moving');
    advance(1000);
    expect(stage).toHaveAttribute('data-phase', 'located');

    expect(within(dialog).queryByRole('heading')).not.toBeInTheDocument();
    expect(within(dialog).queryByRole('button')).not.toBeInTheDocument();
    expect(dialog).toHaveFocus();
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it.each(['close', 'escape'] as const)('cleans up the pending animation and restores scrolling on %s', (method) => {
    const { dialog, image } = openPreview();
    fireEvent.load(image);
    if (method === 'escape') advance(1000);
    expect(document.body.style.overflow).toBe('hidden');
    expect(vi.getTimerCount()).toBeGreaterThan(0);

    if (method === 'close') {
      fireEvent.click(within(dialog).getByRole('button', { name: 'Close enlarged icon' }));
    } else {
      const cancel = new Event('cancel', { cancelable: true });
      fireEvent(dialog, cancel);
      expect(cancel.defaultPrevented).toBe(true);
    }

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('auto');
    expect(vi.getTimerCount()).toBe(0);
    advance(10000);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('honors reduced motion by showing the location without a moving phase', () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    const { dialog, image, stage } = openPreview();
    fireEvent.load(image);
    advance(1000);
    expect(stage).toHaveAttribute('data-phase', 'located');
    expect(vi.getTimerCount()).toBe(0);
    expect(within(dialog).queryByRole('button')).not.toBeInTheDocument();
  });

  it('runs a one-second placement animation and cancels it when the preview closes', () => {
    const { dialog, image } = openPreview();
    const moving = dialog.querySelector<HTMLElement>('.foundation-interface-icon-dialog__moving-icon')!;
    const cancel = vi.fn();
    moving.animate = vi.fn().mockReturnValue({ cancel });
    fireEvent.load(image);
    advance(1000);
    expect(moving.animate).toHaveBeenCalledWith(expect.any(Array), expect.objectContaining({ duration: 1000 }));
    fireEvent.click(dialog);
    expect(cancel).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('uses the same stage size for custom screenshots as the toolbar preview', () => {
    render(<InterfaceIconPreview index={0} toolbar={false} title="Custom" japanese={false} custom={{ artwork: <svg role="img" aria-label="Custom" />, screen: 'custom.png', region: { bounds: [0, 0, 10, 10], landing: [0, 0, 10, 10] } }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Enlarge: Custom' }));
    const stage = screen.getByRole('dialog', { name: 'Custom' }).querySelector('.foundation-interface-icon-dialog__stage')!;
    expect(stage.getAttribute('style')).toBeNull();
  });

  it('fits full interface captures to the viewport without a native-resolution cap', () => {
    render(<InterfaceIconPreview index={0} toolbar={false} title="Viewport" japanese={false} custom={{ artwork: <svg />, screen: 'screen.png', screenSize: [1024, 574], screenFit: 'viewport', region: { bounds: [0, 0, 10, 10], landing: [0, 0, 10, 10] } }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Enlarge: Viewport' }));
    const stage = screen.getByRole('dialog').querySelector('.foundation-interface-icon-dialog__stage') as HTMLElement;
    expect(stage.style.width).toBe('100vw');
    expect(stage.style.maxWidth).toBe(`${100 * 1024 / 574}dvh`);
    expect(stage.style.aspectRatio).toBe('1024 / 574');
    expect(stage.style.height).toBe('auto');
  });

  it('keeps the enlarged vector available when the interface image cannot load', () => {
    const { dialog, image, stage } = openPreview();
    fireEvent.error(image);
    expect(within(dialog).getByRole('status')).toHaveTextContent('The interface image could not load. You can still view the enlarged icon.');
    expect(within(dialog).getByRole('img', { name: 'Title Bar' })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Show location' })).toBeDisabled();
    advance(10000);
    expect(stage).toHaveAttribute('data-phase', 'enlarged');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('requests real fullscreen from the opening click and exits when closed', async () => {
    const { enter, exit } = mockFullscreen();
    const { dialog } = openPreview();
    expect(enter).toHaveBeenCalledOnce();
    await act(async () => { });
    expect(document.fullscreenElement).toBe(document.documentElement);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(2);
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close enlarged icon' }));
    expect(exit).toHaveBeenCalledOnce();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the preview when the browser exits fullscreen', async () => {
    const { change } = mockFullscreen();
    openPreview();
    await act(async () => { });
    act(() => change(null));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('preserves fullscreen that was active before opening the preview', async () => {
    const { enter, exit } = mockFullscreen(document.documentElement);
    const { dialog } = openPreview();
    await act(async () => { });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close enlarged icon' }));
    expect(enter).not.toHaveBeenCalled();
    expect(exit).not.toHaveBeenCalled();
  });

  it('keeps the preview usable if the browser rejects fullscreen', async () => {
    const { enter, exit } = mockFullscreen();
    enter.mockRejectedValueOnce(new Error('Fullscreen unavailable'));
    const { dialog } = openPreview();
    await act(async () => { });
    expect(dialog).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close enlarged icon' }));
    expect(exit).not.toHaveBeenCalled();
  });

  it('exits a delayed fullscreen request if the preview was already closed', async () => {
    const { enter, exit, change } = mockFullscreen();
    let finish!: () => void;
    enter.mockImplementationOnce(() => new Promise<void>(resolve => { finish = resolve; }));
    const { dialog } = openPreview();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close enlarged icon' }));
    await act(async () => { change(document.documentElement); finish(); });
    expect(exit).toHaveBeenCalledOnce();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('Interface location coverage', () => {
  it('keeps all 10 screen areas and 13 toolbar targets inside the supplied interface', () => {
    for (const [toolbar, count] of [[false, 10], [true, 13]] as const) {
      for (let index = 0; index < count; index++) {
        const { bounds, landing } = interfaceIconRegion(index, toolbar);
        for (const [x, y, width, height] of [bounds, landing]) {
          expect(x).toBeGreaterThanOrEqual(0);
          expect(y).toBeGreaterThanOrEqual(0);
          expect(width).toBeGreaterThan(0);
          expect(height).toBeGreaterThan(0);
          expect(x + width).toBeLessThanOrEqual(1920);
          expect(y + height).toBeLessThanOrEqual(1080);
        }
        expect(landing[0]).toBeGreaterThanOrEqual(bounds[0]);
        expect(landing[1]).toBeGreaterThanOrEqual(bounds[1]);
        expect(landing[0] + landing[2]).toBeLessThanOrEqual(bounds[0] + bounds[2]);
        expect(landing[1] + landing[3]).toBeLessThanOrEqual(bounds[1] + bounds[3]);
      }
    }
  });
});
