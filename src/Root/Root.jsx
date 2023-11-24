import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Authentication/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<LoginPage></LoginPage>
            }
        ]
    },
]);
