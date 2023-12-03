import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "./useAxiousSecure";


const useFeautreCount = () => {
     const axiousSecure=useAxiousSecure()

    const {data:featureCount={}}=useQuery({
        queryKey:['featureCount'],
        queryFn:async()=>{
            const res =await axiousSecure.get('/featureCount')
            return res.data
        }
    })
    return {featureCount}
};

export default useFeautreCount;