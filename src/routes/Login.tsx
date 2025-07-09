import  { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios';
import type { AlertMessage, LoginApiResponse } from '../types/types';
import { loginUser, type LoginData } from '../api/auth'
import Alert from '../components/Alert';
import { useAppContext } from '../context/appContext';


const Login = () => {

    //usamos el context
    const  {setToken,setUsername} = useAppContext();

    const navigate = useNavigate();

    const [alert, setAlert] = useState<AlertMessage>({});

    const [loginData, setLoginData] = useState<LoginData>({
        username:'',
        password:''
    })
    const handletChange = (e:ChangeEvent<HTMLInputElement>)=>{
          setLoginData({...loginData, [e.target.name]:e.target.value})
    }
    const handletSubmit = async (e:FormEvent) =>{
        try {
            e.preventDefault();
            if(loginData.username.trim() === '' || loginData.password.trim()===''){
                setAlert({color:"bg-red-500", message:"Debe completar ambos campos"});
                return;
            }

            //Intentar loguearse y obtener el token
            const respose = await loginUser(loginData);
            if(respose.status === 'success'){
                setToken(respose.token)
                setUsername(respose.username)
                navigate('/admin');
            }
        } catch (error) {
            const err = error as AxiosError<LoginApiResponse>;
            
                if (err.response?.data?.message) {
                    setAlert({color: "bg-red-500",message: err.response.data.message});
                } else {
                    setAlert({color: "bg-red-500",message: "Error desconocido.",});
                } 
        }finally{
            setTimeout(() => {
                setAlert({color:"", message:""})
            }, 2000);
        }
    }
    
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
        <form onSubmit={handletSubmit} className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
            {alert.message ?  <Alert alert={alert} /> : null}
            <h2 className="text-center text-white text-xl font-bold mb-4">
                Inicia sesión para operar
            </h2>
            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="username">Username</label>
                <input onChange={handletChange} className="bg-white rounded w-full p-2 text-stone-950" type="text" name="username" />
            </div>

            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="password">Password</label>
                <input onChange={handletChange} className="bg-white rounded w-full p-2 text-stone-950" type="password" name="password" />
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