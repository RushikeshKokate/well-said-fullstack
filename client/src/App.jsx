import { useLayoutEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
 
import Login from './pages/Login'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'
import User from './pages/User'
import Trash from './pages/Trash'
import TaskDetails from './pages/TaskDetails'
import { Toaster } from 'sonner'

function App() {

  function Layout() {
    const location = useLocation();
    const [user, setUser] = useState(false);

    return user ? (
      <div className='w-full h-screen flex flex-col md:flex-row'>
        <div className='w-1/5 h-screen bg-white sticky top-0  hidden md:block'>
          {/* sidebar */}
        </div>
        {/* mobileNavbar */}
        <div>
          {/* Navbar */}
          <div>
            <Outlet/>
          </div>
        </div>
      </div>
    ) : (
      <Navigate to="/log-in" state={{ from: location }} replace />
    )
  }
   

  return (
     <main>
      <Routes>
        <Route element={<Layout/>}>
          <Route  path="/" element={<Navigate to="/dashboard"/>}/> 
          <Route  path="/dashboard" element={<Dashboard/>}/> 
          <Route  path="/tasks" element={<Task/>}/> 
          <Route  path="/completed/:status" element={<Task/>}/> 
          <Route  path="/in-progress/:status" element={<Task/>}/> 
          <Route  path="/todo/:status" element={<Task/>}/> 
          <Route  path="/team/:status" element={<User/>}/> 
          <Route  path="/trash/:id" element={<Trash/>}/> 
          <Route  path="/task/:id" element={<TaskDetails/>}/> 
        </Route>

        <Route path="/log-in" element={<Login/>} />
      </Routes>
      <Toaster/>
     </main>
  )
}

export default App
