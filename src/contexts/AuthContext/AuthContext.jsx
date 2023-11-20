import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; 

import { authenticate, getRefreshToken, getUserById, registerUser } from '../../utils/authApi';
import Cookies from 'universal-cookie'; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null)
  const [refreshToken, setRefreshToken] = useState("");
  const [accesToken, setAccessToken] = useState("");
  const cookies = new Cookies()

  const getAccesToken = () =>{
    return accesToken;
  }

  const saveUser = (userData) => { 
    setUser(userData.userData)
    cookies.set("user", userData.userData, {path: '/',  maxAge: 10800 })  
  }

  const saveRFT = (userData) => {
    setAccessToken(userData.accessToken)
    setRefreshToken(userData.refreshToken) 
    cookies.set("token", userData.refreshToken, {path: '/',  maxAge: 10800 })  
  }
  const getUser = async() =>{
    try {
      const cookieValue  = cookies.get("user", {path: '/'}) 
      setUser(cookieValue)
      //console.log(user) 
    } catch (error) {
      console.log(error)
    }
  }

  const checkAuthenticated = async () => {
    if(accesToken){
      setIsAuth(true)
    }else{
      const token = cookies.get("token", {path: '/'})
      if(token){ 
        const response = await getRefreshToken({refreshToken:token})
        if (response && response.statusText === 'OK') {
          //console.log("response: ",response.data.user) 
          saveRFT(response.data)  
          setIsAuth(true) 
        }
 
        return
      }
    }
    setLoading(false);
  }

  const login = async (data) => {
    setLoading(true);
    if (data) {
      try { 
        const response = await authenticate(data); 
        setIsAuth(true);
        setLoading(false);
        //console.log(response)
        saveUser(response.data)
        saveRFT(response.data)
        return <Navigate to="/" />;
      
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };


  const logout = () => {
    setIsAuth(false);
    setAccessToken("");   
    setRefreshToken("");  
    setUser(null);       
    cookies.remove("token", { path: '/' }); 
    cookies.remove("user", { path: '/' });  
    return <Navigate to="/login" />;
  };
 
  const register = async (data) => {
    setLoading(true);
    if (data) {
      try { 
        // Realiza la solicitud de registro
        const response = await registerUser(data); 
        
        if (response && response.statusText === 'OK') {
          //console.log("response",response)
          setLoading(false); 
          return true;
        } 
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUser()
    checkAuthenticated()
  }, [])

  const values = {
    isAuth,
    loading,
    user,
    login,
    logout,
    register,
    getAccesToken,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;