import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hook/useAxiousSecure";
// import { useForm } from "react-hook-form"


const AllParcels = () => {
    const axiousSecure = useAxiousSecure();
    // const { register, handleSubmit, formState: { errors }, } = useForm()
    const { data: parcels = [] , refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            refetch()
            const result = await axiousSecure.get('/parcels/')
            
            return result.data
        }
    })

    // console.log(deliverymens)

    // const { data: deliverymens = [], } = useQuery({
    //     queryKey: ['deliverymens'],
    //     queryFn: async () => {
    //         const result = await axiousSecure.get('/deliverymens/')
              
    //         return result.data
    //     }
    // })

    // const onSubmit = async (data) => {
    //     console.log(data)
    //     const assignInfo = {
    //         delivery_men_id: data.delivery_men_id,
    //         appr_delivery_date: data.appr_delivery_date,
    //         status: 'ontheway'
    //     }
    //     console.log(assignInfo)
    //     const result = await axiousSecure.patch(`/manageDeliverymen/${data._id}`, assignInfo)
    //     if (result.data.modifiedCount > 0) {
    //         alert('ok')
    //     }
    // }
//     const handleAssign =e=>{
//   const form= new FormData(e.currentTarget)
//        const delivery_men_id=form.get('delivery_men_id')
//        const appr_delivery_date=form.get('appr_delivery_date')
//     //   const appr_delivery_date=e.target.appr_delivery_date.value;
//     console.log(delivery_men_id,appr_delivery_date)

//     }



    return (
        <div>
            <h1>all parcel</h1>
            <input type="text" placeholder="serch by date range" />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Phone</th>
                            <th>Booking Date</th>
                            <th>Req. Delivery Date</th>
                            <th>Cost</th>
                            <th>Booking Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map(parcel =>
                                <>
                                    <tr key={parcel._id}>
                                        <td>
                                            {parcel.name}
                                        </td>
                                        <td>
                                            {parcel.phone}
                                        </td>
                                        <td>Booking date</td>
                                        <td>{parcel.delivery_date}</td>
                                        <td>{parcel.price}</td>
                                        <td>{parcel.status}</td>
                                        <th>
                                            {/* <button className="btn" > Manage</button> */}
                                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                                           
                                            

                                        </th>
                                    </tr>



                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>



        </div >
    );
};

export default AllParcels;