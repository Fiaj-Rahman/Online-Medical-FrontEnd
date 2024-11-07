import React from "react";
import Navbars from "../Navbar/Navbars"
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const Root= ()=>{
    return(
        <div>
            
            <div><Navbars></Navbars></div>

            <div><Outlet></Outlet></div>

            <div><Footer></Footer></div>

        </div>
    )
}

export default Root;