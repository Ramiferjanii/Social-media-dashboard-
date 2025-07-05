"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  userId: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User, remember: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkTokenExpiration = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (storedToken && storedUser) {
      if (checkTokenExpiration(storedToken)) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
  }, []);

  const login = (newToken: string, userData: User, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('token', newToken);
    storage.setItem('user', JSON.stringify(userData));
    
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      login, 
      logout,
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};