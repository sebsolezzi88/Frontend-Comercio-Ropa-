import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AppContextType {
  token: string | null;
  username: string | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  setUsername: (username: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

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
  const [token, setTokenState] = useState<string | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Al cargar el contexto, recuperar datos de localStorage si existen
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) setTokenState(storedToken);
    if (storedUsername) setUsernameState(storedUsername);
    setLoading(false); 
  }, []);

  // Funciones que actualizan estado y localStorage
  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(token);
  };

  const setUsername = (username: string | null) => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
    setUsernameState(username);
  };

  return (
    <AppContext.Provider value={{ token, username, loading, setToken, setUsername }}>
      {children}
    </AppContext.Provider>
  );
};