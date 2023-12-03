import { useQuery } from '@tanstack/react-query';

import useAxiousSecure from './useAxiousSecure';

const useParcels = () => {
    const axiousSecure = useAxiousSecure();
    const { data: parcels = []} = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const result = await axiousSecure.get('/parcels/')
            return result.data
        }
    })
    return [parcels]
};

export default useParcels;