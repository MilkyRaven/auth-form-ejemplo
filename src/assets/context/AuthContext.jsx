import {useState, createContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import toast from "react-hot-toast";

//1. crea el contexto
export const AuthContext = createContext();

//2. crea el provider
export function AuthProvider({children}) {
    //estado que guarda el usuario logueado
    const [currentUser, setCurrentUser] = useState(null)
    //función que guarda el token en el storage
    const storeToken = (token) => {
        localStorage.setItem("authToken", token);
      };
    //función que elimina el token en el storage
      const removeToken = () => {
        localStorage.removeItem("authToken");
      };
       //función que permite autenticar al usuario
      const authenticateUser = async (email, password) => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
          try {
            setCurrentUser({ email: email, password: password });
          } catch (error) {
            console.log(error);
          }
        } else {
          setCurrentUser(null);
        }
      };
      //función que permite desloguearse
      const logout = () => {
        removeToken();
        toast.success("Successfully logged out!");
        authenticateUser();
        // navigate("/")
      };
    //valor pasado a través del provider, es decir, datos accesibles globalmente gracias al contexto: 
    const value = {
        currentUser,
        storeToken,
        removeToken,
        authenticateUser,
        logout
        }
    //necesario un useEffect para que la función authenticateUser solo se ejecute al montarse el componente
    //o cuando sea explicitamente llamada (en el onSubmit)
          useEffect(() => {
            authenticateUser();
         }, []);
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
//definimos el tipo que corresponde a children para evitar errores
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };