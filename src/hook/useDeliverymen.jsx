import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "./useAxiousSecure";


const useDeliverymen = () => {
    const axiousSecure = useAxiousSecure();
    
     const { data: deliverymens = [] } = useQuery({
        queryKey: ['deliverymens'],
        queryFn: async () => {
         const result=await  axiousSecure.get('/alldeliverymens')
            return result.data
        }
        
    })
    return [deliverymens]
};

export default useDeliverymen;