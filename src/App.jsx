import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import ResetPasswordScreen from './Screens/ResetPasswordScreen/ResetPasswordScreen.jsx'
import RecoveryScreen from './Screens/RecoveryScreen/RecoveryScreen.jsx'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen.jsx'
import LoginScreen from './Screens/LoginScreen/LoginScreen.jsx'
import HomeScreen from './Screens/HomeScreen/HomeScreen.jsx'
import  createWorkspace  from './services/workspaceService.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/recovery" element={<RecoveryScreen />} />
      <Route path="/reset-password/:recovery_token" element={<ResetPasswordScreen />} />

   
      <Route element={<AuthMiddleware />}>
        <Route path="/home" element={<HomeScreen/>} />
        <Route path="/new" element={<createWorkspace/>}/>
      </Route>
    </Routes>
  )
}

export default App
