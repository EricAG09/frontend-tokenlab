import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado do usuário

  useEffect(() => {
    // Verifica o token no localStorage ao carregar o app
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Verifica se o token expirou
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ name: decoded.username || 'Usuário', userId: decoded.userId });
        } else {
          // Remove o token expirado
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const logout = () => {
    // Remove o token e limpa o estado do usuário
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
