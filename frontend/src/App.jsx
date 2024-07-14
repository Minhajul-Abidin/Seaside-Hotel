import { useState } from "react";

import "./App.css";
import AddRoom from "./components/room/AddRoom";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
