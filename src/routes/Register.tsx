import { Link } from "react-router-dom"
import Alert from "../components/Alert"


const Register = () => {
  return (

   <div className="flex justify-center items-center min-h-screen px-4">
    <form className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
        <h2 className="text-center text-white text-xl font-bold mb-4">
          Registrate para administrar 
        </h2>
        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="username">Username</label>
        <input className="bg-white rounded w-full p-2" type="text" id="username" />
        </div>

        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="password">Password</label>
        <input className="bg-white rounded w-full p-2" type="password" id="password" />
        </div>

        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="repeat-password">Repetir Password</label>
        <input className="bg-white rounded w-full p-2" type="password" id="repeat-password" />
        </div>

        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="security-password">Contraseña de seguridad</label>
        <input className="bg-white rounded w-full p-2" type="password" id="security-password" />
        <small className="text-white block mt-1">Código de seguridad del sitio.</small>
        </div>

        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
            Registrarse
        </button>
        <p className="mt-4 text-center">
        ¿Ya estás registrado? <Link to="/login" className="text-green-500 underline">Loguéate</Link>
        </p>
  </form>
</div>

    
  )
}

export default Register