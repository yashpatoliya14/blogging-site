import { useState } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import BlogDisplay from './pages/BlogDisplay'
import BlogCreate from './components/Blog/BlogCreate'
import BlogRead from './components/Blog/BlogRead'


function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>  
            <Route path='/blogs' element={<BlogDisplay/>}/>  
            <Route path='/create-blog/:id' element={<BlogCreate/>}/>  
            <Route path='/:id' element={<BlogRead/>}/>  
          </Route>
        </Routes>
    </>
  )
}

export default App
