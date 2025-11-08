import React from 'react'
import { Route, Routes } from 'react-router'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import { LoginScreen } from './Screens/LoginScreen/LoginScreen'
import AuthMiddleware from './Middlewares/AuthMiddleware'

function App() {

  return (

    <Routes>
     
   
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route element={AuthMiddleware}/>
       <Route path='/home' element={<h1>home</h1>}/>
     
    </Routes>

  )
}

export default App