import { Route, Routes } from 'react-router-dom'

import './App.css'
import Register from './routes/Register'
import Login from './routes/Login'

function App() {
 
  //import.meta.env.VITE_NAME)
  return (
    <>
     <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>

     </Routes>
    </>
  )
}

export default App
