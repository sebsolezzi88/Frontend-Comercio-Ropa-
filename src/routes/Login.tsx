import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
        <form className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="username">Username</label>
                <input className="bg-white rounded w-full p-2" type="text" id="username" />
            </div>

            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="password">Password</label>
                <input className="bg-white rounded w-full p-2" type="password" id="password" />
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