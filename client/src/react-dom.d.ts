declare module 'react-dom' {
    export function createRoot(
      container: Element | Document | DocumentFragment | null,
      options?: { hydrate?: boolean }
    ): {
      render(children: React.ReactNode): void;
      unmount(): void;
    };
  }
  