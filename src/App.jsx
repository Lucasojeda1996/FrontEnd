import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import ResetPasswordScreen from './Screens/ResetPasswordScreen/ResetPasswordScreen.jsx'
import RecoveryScreen from './Screens/RecoveryScreen/RecoveryScreen.jsx'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen.jsx'
import LoginScreen from './Screens/LoginScreen/LoginScreen.jsx'
import HomeScreen from './Screens/HomeScreen/HomeScreen.jsx'
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen/CreateWorkspaceScreen.jsx'
import WorkspaceDetailScreen from './Screens/WorkspaceDetailScreen/WorkspaceDetailScreen.jsx'
import ChannelMessages from './Components/ChannelMessages/ChannelMessages.jsx'

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
        <Route path="/workspace/new" element={<CreateWorkspaceScreen/>}/>
        <Route path='/workspace/:workspace_id' element={<WorkspaceDetailScreen/>}/>
        <Route path="/workspace/:workspace_id/:channel_id?" element={<WorkspaceDetailScreen/>}/>
      
         
      </Route>
    </Routes>
  )
}

export default App
