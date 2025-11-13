import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import ResetPasswordScreen from './Screens/ResetPasswordScreen/ResetPasswordScreen.jsx'
import RecoveryScreen from './Screens/RecoveryScreen/RecoveryScreen.jsx'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen.jsx'
import LoginScreen from './Screens/LoginScreen/LoginScreen.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/recovery" element={<RecoveryScreen />} />
      <Route path="/reset-password/:recovery_token" element={<ResetPasswordScreen />} />

      {/* 🔒 Rutas protegidas */}
      <Route element={<AuthMiddleware />}>
        <Route path="/home" element={<h1>home</h1>} />
      </Route>
    </Routes>
  )
}

export default App
