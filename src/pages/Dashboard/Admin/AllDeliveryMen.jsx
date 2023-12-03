import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hook/useAxiousSecure";
import { Helmet } from "react-helmet";



const AllDeliveryMen = () => {
    const axiousSecure = useAxiousSecure();
  
    const { data: deliverymens = [] } = useQuery({
        queryKey: ['deliverymens'],
        queryFn: async () => {
            const result = await axiousSecure.get('/deliverymens')
            return result.data
        }
    })
    console.log(deliverymens)

    return (
        <div>
            <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">All Delivery Men</h3>

            </div>
            <Helmet>
                <title>|AllDeliveryMen</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="font-semibold text-base text-lime-900 uppercase border-b-2" >
                        <tr>

                            <th>Name</th>
                            <th>Phone</th>
                            <th>No of parcel delivered</th>
                            <th>Average review</th>
                        </tr>
                    </thead>
                    <tbody className="font-semibold text-sm text-[#554f4f]">
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
                                        <td>{deliverymen.totalDelivered}</td>
                                        <td>{deliverymen.totalRating}</td>
                                       
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