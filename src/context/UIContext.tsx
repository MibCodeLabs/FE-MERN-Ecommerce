import { createContext, useContext, useState, type ReactNode } from "react";


interface UIContextType {
  loadingMessage: string | null;

  showLoading: (message: string) => void;
  hideLoading: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  const showLoading = (message: string) => {
    setLoadingMessage(message);
  };
  const hideLoading = () => {
    setLoadingMessage(null);
  };

  return (
    <UIContext.Provider
      value={{
        loadingMessage,
        showLoading,
        hideLoading,
      }}
    >
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
