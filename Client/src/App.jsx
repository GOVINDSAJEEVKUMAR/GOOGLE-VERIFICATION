import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Header from "./Componetns/Header"
import Home from "./Componetns/Home"
import Login from "./Componetns/Login"
import Dashboard from "./Componetns/Dashboard"
import Error from "./Componetns/Error"
const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/error' element={<Error/>}/>
      </Routes>
    </>
  )
}

export default App
