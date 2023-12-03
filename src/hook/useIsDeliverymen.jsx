import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiousSecure from "./useAxiousSecure";
import { useQuery } from "@tanstack/react-query";


const useIsDeliverymen = () => {
    const axiosSecure = useAxiousSecure();
    const { user } = useContext(AuthContext)
    const { data: isDeliverymen, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isDeliverymen'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/deliverymen/${user.email}`);
            console.log(res.data);
            return res.data?.deliverymen;
        }
    })
    console.log(isDeliverymen)
    return [isDeliverymen, isAdminLoading]
    

   
};

export default useIsDeliverymen;