/** Keep each supplied study engine inside its own DOM and lifecycle. */
export function createToolEnvironment(root: ShadowRoot) {
  const html = root.querySelector<HTMLElement>('.tool-document')!;
  const body = root.querySelector<HTMLElement>('.tool-body')!;
  const head = root.querySelector<HTMLElement>('.tool-head')!;
  const disposers: (() => void)[] = [];
  const timeouts = new Set<number>();
  const intervals = new Set<number>();
  const frames = new Set<number>();
  const observers = new Set<MutationObserver>();
  const local = new Map<PropertyKey, unknown>();
  const historyListeners = new Set<EventListenerOrEventListenerObject>();
  const toolHistory: object[] = [{}];
  const listen = (target: EventTarget, name: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
    target.addEventListener(name, listener, options);
    disposers.push(() => target.removeEventListener(name, listener, options));
  };
  const eventTarget = (name: string) => ['keydown','keyup','click','input','change'].includes(name) ? root : window;
  const scopedWindow = new Proxy(window, {
    get(target, key) {
      if (key === 'addEventListener') return (name: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions) => {
        if(name==='popstate') { historyListeners.add(listener); return; }
        listen(eventTarget(name), name, listener, options);
      };
      if (key === 'removeEventListener') return (name: string, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) => eventTarget(name).removeEventListener(name, listener, options);
      if (local.has(key)) return local.get(key);
      const value = Reflect.get(target, key, target);
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set(_target, key, value) { local.set(key, value); return true; },
  });
  const scopedDocument = new Proxy(document, {
    get(target, key) {
      if (key === 'body') return body;
      if (key === 'head') return head;
      if (key === 'documentElement') return html;
      if (key === 'activeElement') return root.activeElement;
      if (key === 'getElementById') return root.getElementById.bind(root);
      if (key === 'querySelector') return root.querySelector.bind(root);
      if (key === 'querySelectorAll') return root.querySelectorAll.bind(root);
      if (key === 'contains') return root.contains.bind(root);
      if (key === 'addEventListener') return (name: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions) => listen(name === 'visibilitychange' ? document : root, name, listener, options);
      if (key === 'removeEventListener') return (name: string, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions) => (name === 'visibilitychange' ? document : root).removeEventListener(name, listener, options);
      const value = Reflect.get(target, key, target);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
  class ScopedObserver extends MutationObserver {
    constructor(callback: MutationCallback) { super(callback); observers.add(this); }
  }
  // The engine's settings/sheet history belongs to the tool, not Next's router.
  // The browser Back button still navigates between website pages normally.
  const scopedHistory = {
    get state(){ return toolHistory.at(-1); },
    pushState(state:object){ toolHistory.push(state); },
    replaceState(state:object){ toolHistory[toolHistory.length-1]=state; },
    back(){
      if(toolHistory.length>1)toolHistory.pop();
      const event=new PopStateEvent('popstate',{state:toolHistory.at(-1)});
      historyListeners.forEach(listener=>typeof listener==='function' ? listener(event) : listener.handleEvent(event));
    },
  };
  const media = (query: string) => {
    const result=window.matchMedia(query);
    return new Proxy(result,{get(target,key){
      if(key==='addEventListener') return (name: string, listener: EventListenerOrEventListenerObject) => listen(target,name,listener);
      const value=Reflect.get(target,key,target);
      return typeof value==='function' ? value.bind(target) : value;
    }});
  };
  return {
    args: [scopedDocument,scopedWindow,
      (fn: TimerHandler, delay?: number) => { const id=window.setTimeout(fn,delay); timeouts.add(id); return id; },
      (fn: TimerHandler, delay?: number) => { const id=window.setInterval(fn,delay); intervals.add(id); return id; },
      window.clearTimeout.bind(window),window.clearInterval.bind(window),
      (fn: FrameRequestCallback) => { const id=window.requestAnimationFrame(fn); frames.add(id); return id; },
      window.cancelAnimationFrame.bind(window),ScopedObserver,scopedHistory,media] as const,
    dispose() {
      disposers.forEach(fn=>fn()); timeouts.forEach(clearTimeout); intervals.forEach(clearInterval);
      frames.forEach(cancelAnimationFrame); observers.forEach(observer=>observer.disconnect());
      historyListeners.clear();
      window.speechSynthesis?.cancel(); root.replaceChildren();
    },
  };
}
