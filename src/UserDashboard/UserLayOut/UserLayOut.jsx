import React from "react";
import { Outlet } from "react-router-dom";
import UserNavBar from "../UserNavBar/UserNavBar";
import Footer from "../../Component/Footer/Footer";

const UserLayOut = () => {
  return (
    <div>
        <div className="relative z-80 min-h-screen flex">
      {/* Sidebar */}
      <UserNavBar />

      {/* Main Content */}
      <div className="flex-1 "> {/* This ensures the content area is pushed right to accommodate the sidebar */}
        <div className=" p-5 mt-12">
          {/* This is where child routes will be rendered */}
          <Outlet />
          
        </div>
      </div>

    
    </div>

 
    </div>
  );
};

export default UserLayOut;
