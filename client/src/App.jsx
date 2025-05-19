import { useState } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import BlogDisplay from './pages/BlogDisplay'
import BlogCreate from './components/Blog/BlogCreate'
import BlogRead from './components/Blog/BlogRead'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import VerifyOtp from './pages/VerifyOtp'
import ProtectedRoute from './ProtectedRoute'
import About from './pages/About'


function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>  
            
            <Route path='/blogs' element={<ProtectedRoute><BlogDisplay/></ProtectedRoute>}/>  
            <Route path='/create-blog/:id' element={<ProtectedRoute><BlogCreate/></ProtectedRoute>}/>  
            <Route path='/about' element={<About/>}/>  
            <Route path='/:id' element={<ProtectedRoute><BlogRead/></ProtectedRoute>}/>  
          </Route>
            <Route path='/signin' element={<SignIn/>}/>  
            <Route path='/signup' element={<SignUp/>}/>  
            <Route path='/verify-otp/:email' element={<VerifyOtp/>}/>  

        </Routes>
    </>
  )
}

export default App
