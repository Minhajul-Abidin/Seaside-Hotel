import { useState } from 'react'

import './App.css'
import AddRoom from './components/room/AddRoom'
import { Outlet } from 'react-router-dom'
import Footer from './components/layout/Footer'

function App() {

  return (
    <>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
