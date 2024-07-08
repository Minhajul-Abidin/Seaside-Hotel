import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <>
            {/* TODO -- Make home component*/}
            <h2 className="text-2xl size-fit flex flex-auto">Home</h2>
            
            <Link to="/admin/room/add">
            {/* PS : This is only for development phase and will be changed*/}
            <h3>admin add room</h3>
            </Link>

        </>
    )
}

export default Home;