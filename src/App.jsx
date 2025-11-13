import React from 'react'
import { Route, Routes, Navigate  } from 'react-router'
import RegisterScreen from './Screens/LoginScreen/LoginScreen.jsx'
import LoginScreen  from './Screens/RegisterScreen/RegisterScreen.jsx'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import ResetPasswordScreen from './Screens/ResetPasswordScreen/ResetPasswordScreen.jsx'
import RecoveryScreen from './Screens/RecoveryScreen/RecoveryScreen'


function App() {

  return (

    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path="/recovery" element={<RecoveryScreen />} />
      <Route path="/reset-password/:recovery_token" element={<ResetPasswordScreen />} />
      <Route element={AuthMiddleware}/>
       <Route path='/home' element={<h1>home</h1>}/>
     
    </Routes>

  )
}

export default App