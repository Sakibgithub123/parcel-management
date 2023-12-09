import { useContext, useEffect, useState } from 'react';
import useAxiousSecure from '../../../hook/useAxiousSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
// import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form"
import { Helmet } from 'react-helmet';

const MyParcel = () => {
    const { register, formState: { errors } } = useForm()
    const { user } = useContext(AuthContext)
    const [allParcel, setAllParcel] = useState([])
    const [filterParcel, setFilterParcel] = useState([])
    const disableTrue = true;
    const disableFalse = false;
    // const[allParcel1,setAllParcel1]=useState()
    const axiousSecure = useAxiousSecure();
    // const { data: parcels  } = useQuery({
    //     queryKey: ['parcels'],
    //     queryFn: async () => {
    //         const result = await axiousSecure.get(`/parcels/${user.email}`)
    //         return result.data

    //     }
    // })
    useEffect(() => {
        axiousSecure.get(`/parcels/${user.email}`)
            .then(res => {
                // 
                // return res.data
                setAllParcel(res.data)
                setFilterParcel(res.data)
            })

    }, [])

    // console.log(allParcel)

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
                    const result = await axiousSecure.get(`/parcels/${user.email}`)
                    setFilterParcel(result.data)

                }
            }
        });
    }
    //filter
    const handleParcelFilter = filter => {
        // alert('filter')
        if (filter === 'all') {
            setFilterParcel(allParcel)
        }
        else if (filter === 'pending') {
            // alert('filter')
            const stpending = allParcel.filter(parcel => parcel.status === 'pending')
            setFilterParcel(stpending)
            console.log(stpending)

        } else if (filter === 'ontheway') {
            const ontheway = allParcel.filter(parcel => parcel.status === 'ontheway')
            setFilterParcel(ontheway)
        } else if (filter === 'delivered') {
            const delivered = allParcel.filter(parcel => parcel.status === 'delivered')
            setFilterParcel(delivered)
        } else if (filter === 'cancelled') {
            const cancelled = allParcel.filter(parcel => parcel.status === 'cancelled')
            setFilterParcel(cancelled)
        }
    }
    const handleReview = async (e) => {
        e.preventDefault();
        const form = e.target;
        const review = {
            name: form.name.value,
            image: form.image.value,
            delivery_men_id: form.delivery_men_id.value,
            rating: parseFloat(form.rating.value),
            feedback: form.feedback.value,

        }
        // console.log(review)
        const bookParcel = await axiousSecure.post('/reviews', review)
        if (bookParcel.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thanks for your review!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div>
            <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">My Parcel</h3>
            </div>
            <Helmet>
                <title>|MyParcel</title>
            </Helmet>
            <div className='flex justify-center items-center'>
                <p className="p-5 text-justify text-[#023b6d] leading-6 font-semibold"> Filter By Status:</p>
                <div className="md:navbar-center  lg:flex r">
                    <ul className="menu menu-horizontal uppercase px-1 grid grid-cols-4 md:grid-cols-7 gap-5 text-sm font-semibold">
                        <li className="bg-lime-400 text-[#fff]" onClick={() => handleParcelFilter('all')}><a>All</a></li>
                        <li className="bg-lime-400 text-[#fff]" onClick={() => handleParcelFilter('pending')}><a>pending</a></li>
                        <li className="bg-lime-400 text-[#fff]" onClick={() => handleParcelFilter('ontheway')} ><a>ontheway</a></li>
                        <li className="bg-lime-400 text-[#fff]" onClick={() => handleParcelFilter('delivered')}><a>delivered</a></li>
                        <li className="bg-lime-400 text-[#fff]" onClick={() => handleParcelFilter('cancelled')}><a>cancelled</a></li>
                    </ul>
                </div>
            </div>
            <div className="overflow-x-auto card shadow bg-base-100 p-5">
                <table className="table table-zebra ">
                    {/* head */}
                    <thead className="font-semibold text-base text-lime-900 uppercase border-b-2">
                        <tr >
                            <th>Parcel Type</th>
                            <th>Req. Delivery Date</th>
                            <th>Appr. Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Men Id</th>
                            <th>Booking Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="font-semibold text-sm text-[#554f4f]">

                        {
                            filterParcel.map(parcel =>
                                <>
                                    <tr key={parcel._id}>
                                        <td>
                                            {parcel.parcel_type}
                                        </td>
                                        <td>{parcel.delivery_date}</td>
                                        <td>{parcel.appr_delivery_date ? parcel.appr_delivery_date : ""}</td>
                                        <td>{parcel.booking_date ? parcel.booking_date : ""}</td>
                                        <td>{parcel.delivery_men_id ? parcel.delivery_men_id : ""}</td>
                                        <td className='text-red-400'>{parcel.status}</td>
                                        {/* <td>{parcel._id}</td> */}

                                        <td>
                                            <dialog id={parcel._id} className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg text-center">Leave A Review</h3>
                                                    <div>
                                                        <form onSubmit={handleReview} >
                                                            <div className="form-control">
                                                                <input type="hidden" defaultValue={parcel.name} {...register("name", { required: true, })} className="input input-bordered" />
                                                                <input type="hidden" defaultValue={user.photoURL} {...register("image", { required: true, })} className="input input-bordered" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label text-center">
                                                                    <span className="label-text ">Delivery Men Id</span>
                                                                </label>
                                                                <input type="text" defaultValue={parcel.delivery_men_id} name='delivery_men_id' className="input input-bordered" />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Rating Out of 5</span>
                                                                </label>
                                                                <input type="number" min={0} max={5} {...register("rating", { min: 0, max: 5 })} placeholder="Rating out of 5" className="input input-bordered" />
                                                                {errors.rating?.type === "required" && <span className="text-red-900">Rating field is required</span>}
                                                                {errors.rating?.type === "min" && <span className="text-red-900">Rating cannot be less than 0</span>}
                                                                {errors.rating?.type === "required" && <span className="text-red-900">Rating cannot be greater than 5</span>}
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Feedback</span>
                                                                </label>
                                                                <textarea {...register("feedback")} placeholder="Feedback" cols="30" rows="10" className="input input-bordered"></textarea>
                                                                {errors.feedback?.type === "required" && <span className="text-red-900">Feedback field is required</span>}
                                                            </div>
                                                            <div className="form-control mt-6">
                                                                <button type="submit" className="btn bg-lime-900 text-[#ffffff]">Submit</button>
                                                            </div>
                                                        </form>
                                                        <form method="dialog">
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                    </div>

                                                </div>
                                            </dialog>
                                            {
                                                parcel.status == 'delivered' ? <button className="bg-rose-400 text-[#ffffff] py-2 px-3 my-2 mx-2  rounded-sm" onClick={() => document.getElementById(`${parcel._id}`).showModal()}>Review</button> : ""
                                            }

                                            {
                                                parcel.status === 'delivered' ? "" : <div> <button onClick={() => handleCancelBooking(parcel._id)} disabled={parcel.status === 'cancelled' ? disableTrue : disableFalse} className="bg-red-400 text-[#ffffff] py-2 px-3 my-2 mx-2 rounded-sm">Cancel</button></div>

                                            }
                                            <div><Link to="/dashboard/payment"> <button className="bg-green-400 text-[#ffffff] py-2 px-3 my-3 rounded-sm mx-2">Pay</button></Link></div>
                                            <div><Link to={`/dashboard/parcelDetails/${parcel._id}`}><button className="bg-lime-400 text-[#ffffff] py-2 px-3 rounded-sm my-2 mx-2">Update</button></Link></div>


                                        </td>
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