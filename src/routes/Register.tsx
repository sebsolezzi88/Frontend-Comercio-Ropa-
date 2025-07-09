import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import axios, {isAxiosError,AxiosError} from "axios";
import { registerUser, type RegisterData } from "../api/auth";
import { fieldsRegisterDataEmpty } from "../utils/functions";
import type { AlertMessage, RegisterApiResponse } from "../types/types";


const Register = () => {

  const [alert, setAlert] = useState<AlertMessage>({});

  const [register, setRegister] = useState<RegisterData>({
        username:'',
        email:'',
        password:'',
        passwordr:'',
        passwordAuth:''
  });

  const handletChange = (e:ChangeEvent<HTMLInputElement>)=>{
      setRegister({...register, [e.target.name]:e.target.value})
  }
  const handletSubmit = async (e:FormEvent)=>{
    e.preventDefault();
    
    if(fieldsRegisterDataEmpty(register)){
      setAlert({color:'bg-red-500', message:'Debe completar todos los campos'});
      return;
    }

    try {
      const response = await registerUser(register);
      if(response.status==="success"){
        setAlert({color:'bg-green-500', message:'Cuenta creada.'});
      }
    } catch (error) {
      const err = error as AxiosError<RegisterApiResponse>;

        if (err.response?.data?.message) {
          setAlert({color: "bg-red-500",message: err.response.data.message});
        } else {
          setAlert({color: "bg-red-500",message: "Error desconocido.",});
        } 
  } finally{
    setTimeout(() => {
      setAlert({});
    }, 2000);
  }

  }


  return (

   <div className="flex justify-center items-center min-h-screen px-4">
    <form onSubmit={handletSubmit} className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
        {alert.message ?  <Alert alert={alert} /> : null}
        <h2 className="text-center text-white text-xl font-bold mb-4">
          Registrate para administrar 
        </h2>
        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="username">Username</label>
        <input onChange={handletChange} className="bg-white rounded w-full p-2 text-stone-950" type="text" name="username" />
        </div>

        <div className="mt-2">
          <label className="block text-green-500 font-bold uppercase" htmlFor="email">Email</label>
            <input onChange={handletChange}  className="bg-white rounded w-full p-2 text-stone-950" type="email" name="email" />
        </div>

        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="password">Password</label>
        <input onChange={handletChange}  className="bg-white rounded w-full p-2 text-stone-950" type="password" name="password" />
        </div>

        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="repeat-password">Repetir Password</label>
        <input onChange={handletChange}  className="bg-white rounded w-full p-2 text-stone-950" type="password" name="passwordr" />
        </div>

        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="security-password">Contraseña de seguridad</label>
        <input onChange={handletChange}  className="bg-white rounded w-full p-2 text-stone-950" type="password" name="passwordAuth" />
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