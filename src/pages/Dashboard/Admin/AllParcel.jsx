
import useAxiousSecure from "../../../hook/useAxiousSecure";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import useDeliverymen from "../../../hook/useDeliverymen";
// import useParcels from "../../../hook/useParcels";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
// import { useState } from "react";

const AllParcel = () => {
    const { register,  formState: { errors }, } = useForm()
    const axiousSecure = useAxiousSecure();
    const [deliverymens] = useDeliverymen()
    // const [parcels] = useParcels()
    const [allParcel, setAllParcel] = useState([])
    const [allParcelfilter, setFilterParcel] = useState([])

    useEffect(() => {
        axiousSecure.get('/parcels/')
            .then(res => {
                // 
                // return res.data
                setAllParcel(res.data)
                setFilterParcel(res.data)
            })

    }, [])





    const handleAssignDeliverymen = async (e) => {
        e.preventDefault()
        const form = e.target;
        const id = form.assignId.value
        console.log(id)
        const assignInfo = {
            delivery_men_id: form.delivery_men_id.value,
            appr_delivery_date: form.appr_delivery_date.value,
            status: 'ontheway'
        }
        console.log(assignInfo)
        const result = await axiousSecure.put(`/manageDeliverymen/${id}`, assignInfo)
        if (result.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Deliverymen assign Success!",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    const handleFilter = e => {
        e.preventDefault()
        const form = e.target;
        const start = form.start.value
        const end = form.end.value
        console.log(start, end)
        const filterdate = allParcel.filter(parcel => parcel.booking_date >= start && parcel.booking_date <= end)
        setFilterParcel(filterdate)



    }
    return (
        <div>
            <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">All Parcels</h3>
            </div>
            <Helmet>
                <title>|AllParcel</title>
            </Helmet>
            <form onSubmit={handleFilter} >
                <div className="flex flex-col md:flex-row  justify-center items-center gap-5">
                    <div className="py-4 text-center form-control">
                        <p className="label-text font-semibold text-lime-900">Start Date</p>
                        <input type="date" name="start" placeholder="Start Date" className="input input-bordered border-green-400 text-gray-400 font-semibold w-full max-w-xs" />
                    </div>
                    <div className="py-4 text-center form-control">
                        <p className="label-text font-semibold text-lime-900">End Date</p>
                        <input type="date" name="end" placeholder="End Date" className="input input-bordered border-green-400 text-gray-400 font-semibold w-full max-w-xs" />
                    </div>
                </div>
                <div className="pb-4 pt-1 text-center ">
                    <button className="bg-green-400 text-[#ffffff] py-2 px-3 rounded-sm mx-2">Search BY Date</button>
                </div>

            </form>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="font-semibold text-base text-lime-900 uppercase border-b-2">
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
                    <tbody className="font-semibold text-sm text-[#554f4f]">
                        {/* row 1 */}
                        {
                            allParcelfilter.map(parcel =>
                                <>
                                    <tr key={parcel._id}>
                                        <td>
                                            {parcel.name}
                                        </td>
                                        <td>
                                            {parcel.phone}
                                        </td>
                                        <td>{parcel.booking_date}</td>
                                        <td>{parcel.delivery_date}</td>
                                        <td>{parcel.price}</td>
                                        <td>{parcel.status}</td>
                                        <td>
                                            <dialog id={parcel._id} className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg text-center">Manage  Delivery man</h3>
                                                    <div>
                                                        <form onSubmit={handleAssignDeliverymen} >
                                                            <input type="hidden" name="assignId" value={parcel._id} />
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">DeliveryMen Id</span>
                                                                </label>
                                                                <select defaultValue="default" {...register("delivery_men_id")} className="select select-bordered">
                                                                    {
                                                                        deliverymens.map(deliverymen =>
                                                                            <>
                                                                                <option defaultValue="default" key={deliverymen._id} value={deliverymen._id}>{deliverymen._id}</option>
                                                                            </>

                                                                        )
                                                                    }
                                                                </select>
                                                                {errors.delivery_men_id?.type === "required" && <span className="text-red-900">DeliveryMen Id field is required</span>}
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Approximate Delivery Date</span>
                                                                </label>
                                                                <input type="date"  {...register("appr_delivery_date")} placeholder="Approximate Delivery Date" className="input input-bordered" />
                                                                {errors.appr_delivery_date?.type === "required" && <span className="text-red-900">Requested Delivery Date field is required</span>}
                                                            </div>
                                                            <div className="form-control mt-6">
                                                                <button type="submit" className="btn bg-lime-900 text-[#ffffff]">Assign</button>
                                                            </div>
                                                        </form>
                                                        <form method="dialog">
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    </div>
                                                    
                                                </div>
                                            </dialog>
                                            <button className="bg-green-400 text-[#ffffff] py-2 px-3 rounded-sm mx-2" onClick={() => document.getElementById(`${parcel._id}`).showModal()}>Mange</button>
                                        </td>
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

export default AllParcel;