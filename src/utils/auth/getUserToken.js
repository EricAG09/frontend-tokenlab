import {jwtDecode} from 'jwt-decode';


export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
  
    // Verificar se o token existe e está no formato correto
    if (!token || token.split('.').length !== 3) {
      console.error('Token inválido ou inexistente:', token);
      return false;
    }
  
    try {
      const decoded = jwtDecode(token);
      console.log('Token decodificado:', decoded);
  
      // Verificar se o token contém o `userId` e se ainda é válido
      if (decoded?.userId && Date.now() / 1000 < decoded.exp) {
        return true;
      } else {
        console.error('Token expirado ou inválido:', decoded);
        return false;
      }
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return false;
    }
  };