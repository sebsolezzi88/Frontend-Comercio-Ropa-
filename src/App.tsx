import { Route, Routes } from 'react-router-dom'

import './App.css'
import Register from './routes/Register'
import Login from './routes/Login'
import Navbar from './components/Navbar'
import Admin from './routes/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import Main from './routes/Main'

function App() {
 
  return (
    <>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Main/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
     </Routes>
    </>
  )
}

export default App
