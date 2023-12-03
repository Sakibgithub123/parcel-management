import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useUser from "../hook/useUser";


const UserPrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const [isUser, isAdminLoading] = useUser();
    const location = useLocation()
    
    if(loading || isAdminLoading ){
        return <p className='font-semibold text-lg'>Loading......</p>
    }
    if(user || isUser){
        return children;
    }
    return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
};

export default UserPrivateRoute;