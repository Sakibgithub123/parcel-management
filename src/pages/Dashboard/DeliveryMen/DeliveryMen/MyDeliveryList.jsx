import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../../hook/useAxiousSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from 'sweetalert2'


const MyDeliveryList = () => {
    const axiousSecure = useAxiousSecure();
   
  const {user}=useContext(AuthContext) 
    const { data: deliverymenId } = useQuery({
        queryKey: ['deliverymenId'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/deliverymenId/${user?.email}`)
            return result.data
        }
    })
    // console.log(deliverymenId[0]._id)
    // const id=deliverymenId[0]._id
    // console.log(id)
    // console.log(deliverymenId)
    // console.log(deliverymenId._id)
    const { data: deliverylists = [], refetch } = useQuery({
        queryKey: ['deliverylists'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/deliverylist/${deliverymenId._id}`)
            refetch()
            return result.data
        }
    })
    // console.log(deliverylists)
    //cancel booking
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
    //delivered booking
    const handleDeliveredBooking= id=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delivered this this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delivered it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                // const cancelStatus={
                //     status:'Cancelled'
                // }
                const cancelParcel = await axiousSecure.patch(`/parcelsDelivery/${id}`) 
                if(cancelParcel.data.modifiedCount > 0){
                    Swal.fire({
                        title: "Cancel!",
                        text: "Your parcel has been Delivered.",
                        icon: "success"
                      });
                }
            }
          });
    }
    return (
        <div>
            <h1>My Delivery List</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Booked User’s Name</th>
                            <th>Receivers Name</th>
                            <th>Booked User’s Phone</th>
                            <th>Req. Delivery Date</th>
                            <th>Appr. Delivery Date</th>
                            <th>Receivers Phn No.</th>
                            <th>Receivers Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            deliverylists.map(deliverylist =>
                                <>
                                    <tr key={deliverylist._id}>
                                        <td>
                                            {deliverylist.name}
                                        </td>
                                        <td>
                                            {deliverylist.reciever_name}
                                        </td>
                                        <td>
                                            {deliverylist.phone}
                                        </td>
                                        <td>{deliverylist.delivery_date}</td>
                                        <td>{deliverylist.appr_delivery_date}</td>
                                        <td>{deliverylist.reciever_phone_no}</td>
                                        <td>{deliverylist.delivery_address}</td>
                                        <th>
                                           <button className="btn btn-primary">View Location</button>
                                           <button onClick={()=>{handleCancelBooking(deliverylist._id)}} className="btn btn-warning">Cancel</button>
                                           <button onClick={()=>{handleDeliveredBooking(deliverylist._id)}} className="btn" >Delivery</button>

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

export default MyDeliveryList;