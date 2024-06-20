import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import AddRoom from './components/room/AddRoom.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'  element = {<App/>}>
      <Route path = ''  element = {<Home/>}/>
      <Route path='admin/room/add' element = {<AddRoom/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
