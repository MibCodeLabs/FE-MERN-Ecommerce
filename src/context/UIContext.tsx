import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface UIContextType {
  loadingMessage: string | null;
  showLoading: (message: string) => void;
  hideLoading: () => void;
}

const UIContext = createContext<UIContextType | undefined>(
  undefined,
);

interface UIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  const [loadingMessage, setLoadingMessage] = useState<string | null>(
    null,
  );

  const showLoading = useCallback((message: string) => {
    setLoadingMessage(message);
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingMessage(null);
  }, []);

  const value = useMemo(
    () => ({
      loadingMessage,
      showLoading,
      hideLoading,
    }),
    [loadingMessage, showLoading, hideLoading],
  );

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used inside a UIProvider");
  }

  return context;
}
