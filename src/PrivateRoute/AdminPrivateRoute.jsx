import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../hook/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminPrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin();
    const location =useLocation()
    if(loading || isAdminLoading ){
        return  <p className='font-semibold text-lg'>Loading......</p>
    }
    if(user || isAdmin){
        return children;
    }
    return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
};

export default AdminPrivateRoute;