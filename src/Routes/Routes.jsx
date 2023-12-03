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
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen";
import MyDeliveryList from "../pages/Dashboard/DeliveryMen/DeliveryMen/MyDeliveryList";
import AllParcel from "../pages/Dashboard/Admin/AllParcel";
import Reviews from "../pages/Dashboard/DeliveryMen/DeliveryMen/Reviews";
import ProfileUpdate from "../pages/Dashboard/User/Action/ProfileUpdate";
import Payment from "../pages/Dashboard/User/Payment/Payment";
import UserPrivateRoute from "../PrivateRoute/UserPrivateRoute";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";
import DeliverymenPrivateRoute from "../PrivateRoute/DeliverymenPrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
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
        errorElement:<ErrorPage></ErrorPage>,
        children:[
         {
            path:'bookParcel',
            element:<UserPrivateRoute><BookParcel></BookParcel></UserPrivateRoute>
         },
         {
            path:'myParcel',
            element:<UserPrivateRoute><MyParcel></MyParcel></UserPrivateRoute>
         },
         {
            path:'parcelDetails/:id',
            element:<UserPrivateRoute><ParcelUpdatePage></ParcelUpdatePage></UserPrivateRoute>,
            loader:({params})=>fetch(`https://parcel-management-server-phi.vercel.app/parcelDetails/${params.id}`)
         },
         {
            path:'payment',
            element:<UserPrivateRoute><Payment></Payment></UserPrivateRoute>

         },
         {
            path:'myProfile',
            element:<UserPrivateRoute><MyProfile></MyProfile></UserPrivateRoute>
         },
         {
            path:'updateProfile/:id',
            element:<UserPrivateRoute><ProfileUpdate></ProfileUpdate></UserPrivateRoute>
         },
         //admin
         {
            path:'statistics',
            element:<AdminPrivateRoute><Statistics></Statistics></AdminPrivateRoute>
         },
         {
            path:'allUsers',
            element:<AdminPrivateRoute><AllUsers></AllUsers></AdminPrivateRoute>,
            loader:()=>fetch('https://parcel-management-server-phi.vercel.app/pageCount')
         },
         {
            path:'allParcels',
            element:<AdminPrivateRoute><AllParcel></AllParcel></AdminPrivateRoute>
         },
         
         {
            path:'allDeliverymen',
            element:<AdminPrivateRoute><AllDeliveryMen></AllDeliveryMen></AdminPrivateRoute>
         },
         // deliverymen side
         {
            path:'myDeliveryList',
            element:<DeliverymenPrivateRoute><MyDeliveryList></MyDeliveryList></DeliverymenPrivateRoute>
         },
         {
            path:'reviews',
            element:<DeliverymenPrivateRoute><Reviews></Reviews></DeliverymenPrivateRoute>
         },
    ]
    }
]);