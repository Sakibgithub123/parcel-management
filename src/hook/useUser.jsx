import { useContext } from "react";
import useAxiousSecure from "./useAxiousSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useUser = () => {
    const axiosSecure = useAxiousSecure();
    const { user } = useContext(AuthContext)
    const { data: isUser, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/user/${user.email}`);
            // console.log(res.data);
            return res.data?.user;
        }
    })
    // console.log(isUser)
    return [isUser, isAdminLoading]
    
   
};

export default useUser;