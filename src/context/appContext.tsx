import React, { createContext, useContext, useState, type ReactNode} from "react";

interface AppContextType {
  token: string | null;
  username: string | null;
  setToken: (token: string | null) => void;
  setUsername: (username: string | null) => void;
}

// Contexto con valores por defecto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ token, username, setToken, setUsername }}>
      {children}
    </AppContext.Provider>
  );
};