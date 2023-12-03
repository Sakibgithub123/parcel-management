import  { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useIsDeliverymen from '../hook/useIsDeliverymen';
import { Navigate, useLocation } from 'react-router-dom';

const DeliverymenPrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const [isDeliverymen, isAdminLoading] = useIsDeliverymen();
    const location =useLocation()
    if(loading || isAdminLoading ){
        return <p className='font-semibold text-lg'>Loading......</p>
    }
    if(user || isDeliverymen){
        return children;
    }
    return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
};

export default DeliverymenPrivateRoute;