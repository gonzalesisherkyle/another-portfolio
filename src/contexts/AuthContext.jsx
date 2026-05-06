import { createContext, useContext, useMemo, useState } from 'react';
import { adminApi } from '../api/portfolio';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_admin_token'));
  const [admin, setAdmin] = useState(null);

  const login = async (credentials) => {
    const data = await adminApi.login(credentials);
    localStorage.setItem('portfolio_admin_token', data.token);
    setToken(data.token);
    setAdmin(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setToken(null);
    setAdmin(null);
  };

  const value = useMemo(() => ({ token, admin, login, logout, isAuthenticated: Boolean(token) }), [token, admin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
