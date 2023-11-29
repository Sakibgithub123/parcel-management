import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hook/useAxiousSecure";


const AllDeliveryMen = () => {
    const axiousSecure = useAxiousSecure();
  
    const { data: deliverymens = [], refetch } = useQuery({
        queryKey: ['deliverymens'],
        queryFn: async () => {
            const result = await axiousSecure.get('/deliverymens/')
            refetch()
            return result.data
        }
    })
    console.log(deliverymens)

    return (
        <div>
            <h1>all delivery men</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Phone</th>
                            <th>No of parcel delivered</th>
                            <th>Average review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            deliverymens.map(deliverymen =>
                                <>
                                    <tr key={deliverymen._id}>
                                        <td>
                                            {deliverymen.name}
                                        </td>
                                        <td>
                                            {deliverymen.phone}
                                        </td>
                                        <td>{deliverymen.total_delivered}</td>
                                        <td>{deliverymen.total_rating}</td>
                                       
                                    </tr>



                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;