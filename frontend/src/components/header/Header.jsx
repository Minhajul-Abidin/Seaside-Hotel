import React from "react";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
import "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
import logo from "../../assets/images/logo.png";

export default function Header() {
  // Need some changes here

  const navLinks = document.querySelector(".nav-links");
  const onToggleMenu = (e) => {
    e.name = e.name === "menu" ? "close" : "menu";
    navLinks.classList.toggle("top-[9%]");
  };

  return (
    <header className="bg-[#efede7]">
      <nav className="flex justify-between items-center w-[92%]  mx-auto">
        <div>
          <img className="w-40 cursor-pointer" src={logo} alt="..." />
        </div>
        <div className="nav-links duration-500 md:static absolute bg-transparent md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <a className="hover:text-gray-500" href="#">
                Rooms
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Locations
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Pricing
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Seasides
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Hotels
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
            Sign in
          </button>
          <ion-icon
            onclick={onToggleMenu}
            name="menu"
            className="text-3xl cursor-pointer md:hidden"
          ></ion-icon>
        </div>
      </nav>
    </header>
  );
}
