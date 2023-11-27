import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Authentication/LoginPage";
import SignUpPage from "../pages/Authentication/SignUpPage";
import Dashboard from "../Layouts/Dashboard";
import BookParcel from "../pages/Dashboard/User/BookParcel";
import MyParcel from "../pages/Dashboard/User/MyParcel";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import ParcelUpdatePage from "../pages/Dashboard/User/Action/ParcelUpdatePage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Statistics from "../pages/Dashboard/Admin/Statistics";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllParcels from "../pages/Dashboard/Admin/AllParcels";
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen";

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
            },
            {
                path:'/signup',
                element:<SignUpPage></SignUpPage>
            },
        ]
    },
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
         {
            path:'bookParcel',
            element:<PrivateRoute><BookParcel></BookParcel></PrivateRoute>
         },
         {
            path:'myParcel',
            element:<PrivateRoute><MyParcel></MyParcel></PrivateRoute>
         },
         {
            path:'parcelDetails/:id',
            element:<PrivateRoute><ParcelUpdatePage></ParcelUpdatePage></PrivateRoute>,
            loader:({params})=>fetch(`http://localhost:5000/parcelDetails/${params.id}`)
         },
         {
            path:'myProfile',
            element:<MyProfile></MyProfile>
         },
         //admin
         {
            path:'statistics',
            element:<Statistics></Statistics>
         },
         {
            path:'allUsers',
            element:<AllUsers></AllUsers>
         },
         {
            path:'allParcels',
            element:<AllParcels></AllParcels>
         },
         {
            path:'allDeliverymen',
            element:<AllDeliveryMen></AllDeliveryMen>
         },
    ]
    }
]);