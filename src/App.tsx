import { Route, Routes } from 'react-router-dom'

import './App.css'
import Register from './routes/Register'
import Login from './routes/Login'
import Navbar from './components/Navbar'

function App() {
 
  //import.meta.env.VITE_NAME)
  return (
    <>
    <Navbar/>
     <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

     </Routes>
    </>
  )
}

export default App
