import { useContext } from "react";
import { useRef } from "react";
import { AuthContext } from "../context/AuthContext";
//toast permite añadir cierto tipo de notificaciones 
import toast from 'react-hot-toast';

function TraditionalFormComponent() {
    //importamos el contexto auth para poder usar sus funciones
    const {authenticateUser, storeToken} = useContext(AuthContext);
    //guardamos inputs en refs en vez de en states
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    //función que se ejecutará en el submit - handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        console.log(emailRef.current.value, passwordRef.current.value);
        //en este momento se van a enviar los datos al backend y se obtendrá una respuesta -
        //const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, user); 
        //se obtendrá un objeto response - por ahora lo falseamos con un token falso
        storeToken("0011");
        authenticateUser(emailRef.current.value, passwordRef.current.value);
        //storeToken(response.data.authToken);
        //navegaríamos a una página privada/protegida
        //navigate('/profile');
        toast.success('Welcome back!')  
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <form onSubmit={handleSubmit}>
    <label>
        Email:
        <input
        type="email"
        name="email"
        ref={emailRef}
        required
        >
        </input>
    </label>
    <label>
        Password:
        <input
        type="password"
        name="password"
        ref={passwordRef}
        required
        >
        </input>
    </label>
    <label>
        Password Confirmation:
        <input
        type="password"
        name="password"
        ref={confirmPasswordRef}
        required
        >
        </input>
    </label>
    <button type="submit">Sign Up</button>
    </form>
  )
}

export default TraditionalFormComponent