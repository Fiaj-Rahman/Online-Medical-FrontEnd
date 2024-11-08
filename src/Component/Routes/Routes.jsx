import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import HomePage from "../../Pages/Home/HomePage/HomePage";
import BlogPage from "../../Pages/Blog/BlogPage/BlogPage";
import FindDoctorPage from "../../Pages/FindDoctor/FindDoctorPage/FindDoctorPage";
import Contact from "../../Pages/Contact/Contact";
import BecomeDoctorPage from "../../Pages/BecomeDoctor/BecomeDoctorPage/BecomeDoctorPage";

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
                path:"/contact",
                element:<Contact></Contact>
            },
            {
                path:"/become-doctor",
                element:<BecomeDoctorPage></BecomeDoctorPage>
            }
        ]

    }
])