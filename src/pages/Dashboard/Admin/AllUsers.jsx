import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hook/useAxiousSecure";
import Swal from 'sweetalert2'


const AllUsers = () => {
    const axiousSecure = useAxiousSecure();
  
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiousSecure.get('/users/')
            refetch()
            return result.data
        }
    })
    //make admin
    const handleMakeAdmin= id=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this user to Admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const cancelParcel = await axiousSecure.patch(`/makeAddmin/${id}`) 
                if(cancelParcel.data.modifiedCount > 0){
                    Swal.fire({
                        title: "Cancel!",
                        text: "Admin making success.",
                        icon: "success"
                      });
                }
            }
          });
    }
    //make deliverymen
    const handleDelivermen= id=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this user to Delivermen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const cancelParcel = await axiousSecure.patch(`/makeDeliveryMen/${id}`) 
                if(cancelParcel.data.modifiedCount > 0){
                    Swal.fire({
                        title: "Cancel!",
                        text: "Delivermen making success.",
                        icon: "success"
                      });
                }
            }
          });
    }
    return (
        <div>
            <h1>all users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>No of parcel Booked</th>
                            <th>Total Spent Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map(user =>
                                <>
                                    <tr key={user._id}>
                                        <td>
                                            {user.name}
                                        </td>
                                        <td>
                                            {user.phone}
                                        </td>
                                        <td>No of parcel Booked</td>
                                        <td>Total Spent Amount</td>
                                        <th>
                                           <button onClick={()=>{handleMakeAdmin(user._id)}} className="btn">Make Admin</button>
                                           <button onClick={()=>{handleDelivermen(user._id)}} className="btn">Make Deliverymen</button>

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

export default AllUsers;