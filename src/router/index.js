import { createBrowserRouter } from "react-router-dom"; 
import PublicLayout from '../layouts/publicLayout/index'
 
import Login from '../pages/login/index'
import Register from '../pages/register/index'
import Dashboard from "../pages/dashboard/index";
import Book from "../pages/book/Book";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import UserProfile from "../pages/userProfile/UserProfile";
 

export const router = createBrowserRouter([
    //rutas 
    {
        path: "/", 
        element: <PublicLayout/>, 
        errorElement: <NotFoundPage/>,
        children:[
            { 
                index:true,
                path:'/',
                element: <Dashboard/>
            },  
            {
                path: '/book/:id',
                element: <Book/>,
            },
            {
                path: '/profile',
                element: <UserProfile/>
            },
            {  
                path:'/login',
                element: <Login/>
            },
            { 
                path:'/register',
                element: <Register/>
            },
                
            
        ]
    },
     
])