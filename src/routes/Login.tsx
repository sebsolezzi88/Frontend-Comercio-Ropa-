import  { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { LoginData } from '../api/auth'


const Login = () => {

    const [loginData, setLoginData] = useState<LoginData>({
        username:'',
        password:''
    })
    const handletChange = (e:ChangeEvent<HTMLInputElement>)=>{
          setLoginData({...loginData, [e.target.name]:e.target.value})
    }
    const handletSubmit = (e:FormEvent) =>{
        e.preventDefault();+
        console.log(loginData)
    }
    
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
        <form className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
            <h2 className="text-center text-white text-xl font-bold mb-4">
                Inicia sesión para operar
            </h2>
            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="username">Username</label>
                <input onChange={handletChange} className="bg-white rounded w-full p-2" type="text" id="username" />
            </div>

            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="password">Password</label>
                <input onChange={handletChange} className="bg-white rounded w-full p-2" type="password" id="password" />
            </div>

            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
                Login
            </button>
            <p className="mt-4 text-center">
             ¿No tienes cuenta? <Link to="/register" className="text-green-500 underline">Registrate</Link>
            </p>
            </form>
        </div>
  )
}

export default Login