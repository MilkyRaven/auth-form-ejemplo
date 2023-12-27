import { useContext } from 'react'
import './App.css'
//import ReactHookComponent from './assets/components/ReactHookComponent'
import TraditionalFormComponent from './assets/components/TraditionalFormComponent'
import { AuthContext } from './assets/context/AuthContext'
import {Toaster} from 'react-hot-toast';
import LogoutButton from './assets/components/LogoutButton'
function App() {
  //usamos a nivel app el currentUser para determinar qué se muestra y qué no en la app
  //esto será mejorado con las rutas privadas/protegidas
const {currentUser} = useContext(AuthContext);
console.log(currentUser);
  return (
    <>
    {/* container que permite mostrar notificaciones de ciertos eventos */}
        <Toaster/>
{!currentUser && <TraditionalFormComponent/>}
  {/* por ahora estos datos no persisten */}
{currentUser?.email && <div><p> Usuario con email: {currentUser.email} y contraseña {currentUser.password}</p></div>}
      <LogoutButton/>
    </>
  )
}

export default App
