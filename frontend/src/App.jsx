import { useState } from 'react'

import './App.css'
import AddRoom from './components/room/AddRoom'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
