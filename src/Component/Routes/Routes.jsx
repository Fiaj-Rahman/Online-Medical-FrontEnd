import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import HomePage from "../../Pages/Home/HomePage/HomePage";
import BlogPage from "../../Pages/Blog/BlogPage/BlogPage";

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
            }
        ]

    }
])