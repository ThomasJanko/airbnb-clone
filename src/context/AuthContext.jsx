import { createContext, useEffect, useState } from 'react';
import UserService from '../public/services/users.service'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentuser] = useState(null);

    useEffect(() => {
      let jwt = JSON.parse(localStorage.getItem('Auth'))
      if(jwt){
        login(jwt)
      }
    }, []);

  const login = (user) => {
    UserService.getUserAuth(user)
    .then((u) => {
      setIsAuthenticated(true);
      setCurrentuser(u.data);
      
    })
    .catch((error) => {})
  
  }

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentuser(null);
    localStorage.removeItem('Auth')

  }

  const context = {
    isAuthenticated,
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
