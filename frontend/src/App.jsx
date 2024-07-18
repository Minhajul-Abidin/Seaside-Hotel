import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import SideBar from './components/layout/SideBar'

function App() {
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      
      {isAdminPath ? (
        <div className="h-screen flex">
        <div className="flex flex-1">
          <SideBar />
          <div className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </div>
        </div>
        </div>
      ) : (
        <>
          <Header />
            <Outlet />
          <Footer />
        </>
      )}
    
    </>
  )
}

export default App
