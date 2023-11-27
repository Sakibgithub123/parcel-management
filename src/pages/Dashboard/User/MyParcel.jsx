import { useContext } from 'react';
import useAxiousSecure from '../../../hook/useAxiousSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const MyParcel = () => {
    const { user } = useContext(AuthContext)
    // console.log(user.email)
    // const [myProfile,setMyProfile]=useState();
    const axiousSecure = useAxiousSecure();

    const { data: parcels = [],refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/parcels/${user.email}`)
            refetch()
            return result.data
        }
    })
    // console.log(parcels)
    // return [menu,loading,refetch]
    const handleCancelBooking= id=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                // const cancelStatus={
                //     status:'Cancelled'
                // }
                const cancelParcel = await axiousSecure.patch(`/parcels/${id}`) 
                if(cancelParcel.data.modifiedCount > 0){
                    Swal.fire({
                        title: "Cancel!",
                        text: "Your parcel has been cancelled.",
                        icon: "success"
                      });
                }
            }
          });
    }
    return (
        <div>
            <h1>my parcel</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Parcel Type</th>
                            <th>Req. Delivery Date</th>
                            <th>Appr. Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Men Id</th>
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
                                            {parcel.parcel_type}
                                        </td>
                                        <td>{parcel.delivery_date}</td>
                                        <td>{parcel.appr_delivery_date ? parcel.appr_delivery_date : ""}</td>
                                        <td>{parcel.delivery_date}</td>
                                        <td>{parcel.delivery_men_id ? parcel.delivery_men_id : ""}</td>
                                        <td>{parcel.status}</td>
                                        <th>
                                            {
                                                parcel.status === 'delivered' ? <button className="btn btn-ghost btn-xs">Review</button> : ''
                                            }
                                            <Link to={`/dashboard/parcelDetails/${parcel._id}`}><button className="btn btn-ghost btn-xs">Update</button></Link>
                                            <button onClick={()=>handleCancelBooking(parcel._id)} className="btn btn-ghost btn-xs">Cancel</button>
                                            <button className="btn btn-ghost btn-xs">Pay</button>
                                        </th>
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

export default MyParcel;