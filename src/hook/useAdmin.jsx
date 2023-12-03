import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "./useAxiousSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useAdmin = () => {
    const axiosSecure = useAxiousSecure();
    const { user } = useContext(AuthContext)
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
  
};

export default useAdmin;