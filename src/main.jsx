import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { router } from './Component/Routes/Routes.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <div className='max-w-screen-2xl mx-auto'>
   <RouterProvider router={router} />
   </div>
  </React.StrictMode>
)
