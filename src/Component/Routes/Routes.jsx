import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import HomePage from "../../Pages/Home/HomePage/HomePage";
import BlogPage from "../../Pages/Blog/BlogPage/BlogPage";
import FindDoctorPage from "../../Pages/FindDoctor/FindDoctorPage/FindDoctorPage";
import Contact from "../../Pages/Contact/Contact";
import BecomeDoctorPage from "../../Pages/BecomeDoctor/BecomeDoctorPage/BecomeDoctorPage";
import UserLayOut from "../../UserDashboard/UserLayOut/UserLayOut";
import UserStatistic from "../../UserDashboard/UserDashboardComponent/UserStatistic/UserStatistic";
import UserProfile from "../../UserDashboard/UserDashboardComponent/UserProfile/UserProfile";
import DoctorDetailsPage from "../../Pages/FindDoctor/FindDoctorComponent/DoctorDetails";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import PrivateRoute from "./../Authentication/PrivateRoute/PrivateRoute"
import Doctor_Management from "../../UserDashboard/UserDashboardComponent/Doctor_Management/Doctor_Management";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path: "/",
                element: <HomePage></HomePage>,
            },
            {
                path:"/blog",
                element:<BlogPage></BlogPage>
            },
            {
                path: "/Find_a_Doctor",
                element: <FindDoctorPage></FindDoctorPage>
            },
            {
                path: "/doctor-details/:id",  // Dynamic route for doctor details
                element: <DoctorDetailsPage></DoctorDetailsPage>
            },
            {
                path:"/contact",
                element:<PrivateRoute><Contact></Contact></PrivateRoute>
            },
            {
                path:"/become-doctor",
                element:<BecomeDoctorPage></BecomeDoctorPage>
            },
            {
                path: "/login",
                element:<Login></Login>
            },
            {
                path:"/signUp",
                element:<SignUp></SignUp>
            }
        ]

    },



    // user dashboard 
    {
        path:'/dashboard',
        element:<UserLayOut></UserLayOut>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path: "statistic",
                element: <UserStatistic></UserStatistic>
            },
            {
                path:"profile",
                element:<UserProfile></UserProfile>
            },
            {
                path:"Doctor-Management",
                element:<Doctor_Management></Doctor_Management>
            },
           
        ]
    }
])