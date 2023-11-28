import { useContext, useState } from 'react';
import useAxiousSecure from '../../../hook/useAxiousSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"

const MyParcel = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { user } = useContext(AuthContext)
    const [allParcels, setAllParcels] = useState([])
    const axiousSecure = useAxiousSecure();
    // : parcels = [],
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/parcels/${user.email}`)
            refetch()
            // setAllParcels(result.data)
            return result.data

        }
    })

    // const p=parcels
    // setAllParcels(p)
    // console.log(allParcels)

    const handleCancelBooking = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const cancelParcel = await axiousSecure.patch(`/parcels/${id}`)
                if (cancelParcel.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Cancel!",
                        text: "Your parcel has been cancelled.",
                        icon: "success"
                    });
                }
            }
        });
    }
    //filter
    const handleParcelFilter = filter => {
        if (filter == 'pending') {
            const stpending = parcels.filter(parcel => parcel.status === 'pending')
            setAllParcels(stpending)

        } else if (filter == 'ontheway') {
            const ontheway = parcels.filter(parcel => parcel.status === 'ontheway')
            setAllParcels(ontheway)
        } else if (filter == 'delivered') {
            const delivered = parcels.filter(parcel => parcel.status === 'delivered')
            setAllParcels(delivered)
        } else if (filter == 'cancelled') {
            const cancelled = parcels.filter(parcel => parcel.status === 'cancelled')
            setAllParcels(cancelled)
        }
    }
    const onSubmit = async (data) => {
        console.log(data)
        const review = {
            name:data.name,
            delivery_men_id:data.delivery_men_id,
            rating:data.rating,
            feedback:data.feedback,

        }
        const bookParcel=await axiousSecure.post('/reviews',review)
        if(bookParcel.data.insertedId){
            Swal.fire({
                title: "Success!",
                text: "Thanks for your review !",
                icon: "success"
              });

        }
    }

    return (
        <div>
            <h1>my parcel</h1>
            <div>
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn m-1">Filter By Status</div>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={() => handleParcelFilter('pending')}><a>Pending</a></li>
                        <li onClick={() => handleParcelFilter('ontheway')}><a>On The Way </a></li>
                        <li onClick={() => handleParcelFilter('delivered')}><a>Delivered</a></li>
                        <li onClick={() => handleParcelFilter('cancelled')}><a>cancel </a></li>
                    </ul>
                </div>
            </div>
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
                                        <td>{parcel.booking_date ? parcel.booking_date : ""}</td>
                                        <td>{parcel.delivery_men_id ? parcel.delivery_men_id : ""}</td>
                                        <td>{parcel.status}</td>
                                        <th>
                                            {
                                                parcel.status === 'delivered' ? <button className="btn btn-ghost btn-xs">Review</button> : ''
                                            }
                                            <button className="btn" onClick={() => document.getElementById(`my_modal-${parcel._id}`).showModal()}>Review</button>
                                            <dialog id={`my_modal-${parcel._id}`} className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg">Leave A Review</h3>

                                                    <form onSubmit={handleSubmit(onSubmit)}>

                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Name</span>
                                                            </label>
                                                            <input type="text" defaultValue={parcel.name} {...register("name", { required: true, })} className="input input-bordered" />

                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Delivery Men Id</span>
                                                            </label>
                                                            <input type="text" defaultValue={parcel.delivery_men_id} {...register("delivery_men_id", { required: true, })} className="input input-bordered" />

                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Rating Out of 5</span>
                                                            </label>
                                                            <input type="text" {...register("rating", { required: true, })} placeholder="Approximate Delivery date" className="input input-bordered" />
                                                            {errors.rating?.type === "required" && <span className="text-red-900">Rating field is required</span>}
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Feedback</span>
                                                            </label>
                                                            <textarea {...register("feedback", { required: true, })} placeholder="Approximate Delivery date" cols="30" rows="10" className="input input-bordered"></textarea>
                                                            {/* <input type="text" {...register("appr_delivery_date", { required: true, })} placeholder="Approximate Delivery date" className="input input-bordered" /> */}
                                                            {errors.feedback?.type === "required" && <span className="text-red-900">Approximate Delivery field is required</span>}
                                                        </div>
                                                        <div className="form-control mt-6">
                                                            <button type="submit" className="btn btn-primary">Submit</button>
                                                        </div>
                                                    </form>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>

                                            <Link to={`/dashboard/parcelDetails/${parcel._id}`}><button className="btn btn-ghost btn-xs">Update</button></Link>
                                            <button onClick={() => handleCancelBooking(parcel._id)} className="btn btn-ghost btn-xs">Cancel</button>
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