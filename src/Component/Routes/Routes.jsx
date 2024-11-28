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
import Blog_Post from "../../UserDashboard/UserDashboardComponent/Blog_Post/Blog_Post";
import BlogDetails from "../../Pages/Blog/BlogComponent/BlogDetails";
import Blog_Management from "../../UserDashboard/UserDashboardComponent/Blog_Management/Blog_Management";
import Payment_Success from "../../Pages/Payment/Payment_Success";
import Payment_Fail from "../../Pages/Payment/Payment_Fail";
import Appointment from "../../Pages/Appointment/Appointment";


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
                path:"/blog/:id",
                element:<PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>
            },
            {
                path: "/Find_a_Doctor",
                element: <FindDoctorPage></FindDoctorPage>
            },
            {
                path: "/doctor-details/:id",  // Dynamic route for doctor details
                element: <PrivateRoute><DoctorDetailsPage></DoctorDetailsPage></PrivateRoute>
            },
            {
                path:"/contact",
                element:<Contact></Contact>
            },
            {
                path:"/become-doctor",
                element:<PrivateRoute><BecomeDoctorPage></BecomeDoctorPage></PrivateRoute>
            },
            {
                path:'/payment/success/:tranId',
                element:<PrivateRoute><Payment_Success></Payment_Success></PrivateRoute>
            },
            {
                path:'/payment/fail/:tranId',
                element:<PrivateRoute><Payment_Fail></Payment_Fail></PrivateRoute>
            },
            {
                path:"/appointment",
                element:<Appointment></Appointment>
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
            {
                path:"Blog-Post",
                element:<Blog_Post></Blog_Post>
            },
            {
                path:"Blog-Management",
                element: <Blog_Management></Blog_Management>
            }
           
        ]
    }
])