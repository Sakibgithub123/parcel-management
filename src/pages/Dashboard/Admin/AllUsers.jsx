import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hook/useAxiousSecure";
import Swal from 'sweetalert2'
import { useState } from "react";
import { useLoaderData } from "react-router-dom";


const AllUsers = () => {
    const axiousSecure = useAxiousSecure();
    const {count}=useLoaderData()
    const [itemPerPage,setItemPerPage]=useState(5);
    const [currentPage,setCurrentPage]=useState(0);
    const noOfPage=Math.ceil(count/itemPerPage)
    const pages=[];
    for(let i=0; i<noOfPage; i++){
        pages.push(i)
    }
    // const pages=[...Array(noOfPage).keys()]
    const handleItemPerpage=(e)=>{
        const val= parseInt(e.target.value);
        setItemPerPage(val);
        setCurrentPage(0)
    }

    const handlePrevPage=()=>{
        if(currentPage > 0){
            setCurrentPage(currentPage -1)
        }
    }
    const handleNextPage=()=>{
        if(currentPage > pages.length-1){
            setCurrentPage(currentPage + 1)
        }
    }

    //fetch data
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/users?page=${currentPage}&size=${itemPerPage}`)
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
                            <th>Role</th>
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
                                        <td>{user.totalBooked}</td>
                                        <td>{user.totalPrice}</td>
                                        <td> {user.role}</td>
                                        <th>
                                           <button onClick={()=>{handleMakeAdmin(user._id)}} className="btn">{user.role=='user'?'Make Admin' :'Admin'}</button>
                                           <button onClick={()=>{handleDelivermen(user._id)}} className="btn">{user.role=='user'?'Make Deliverymen' :'Deliverymen'}</button>

                                        </th>
                                    </tr>



                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="pagination my-5">
                <button className="text-base hover:bg-[#2f2626] bg-[#894444] mx-2 p-2 rounded-lg text-[#fff] font-semibold" onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page=> <button className="text-base mx-2 hover:bg-[#2f2626] bg-[#894444] p-2 rounded-lg text-[#fff] font-semibold"  onClick={()=>setItemPerPage(page)}>{page}</button>)
                }
                <button className="text-base hover:bg-[#2f2626] mx-2 bg-[#894444] p-2 rounded-lg text-[#fff] font-semibold" onClick={handleNextPage}>Next</button>
                <select className="text-base mx-2 bg-[#894444] p-2 rounded-lg text-[#fff] font-semibold" value={itemPerPage} onChange={handleItemPerpage} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default AllUsers;