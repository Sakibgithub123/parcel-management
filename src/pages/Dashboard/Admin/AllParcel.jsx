import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hook/useAxiousSecure";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
// import { useState } from "react";

const AllParcel = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const axiousSecure = useAxiousSecure();
    // const [deliverymens,setDeliverymens]=useState([])
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            refetch()
            const result = await axiousSecure.get('/parcels/')

            return result.data
        }
    })

    // console.log(deliverymens)

    const { data: deliverymens = [], } = useQuery({
        queryKey: ['deliverymens'],
        queryFn: async () => {
         const result=await  axiousSecure.get('/deliverymens/')
        //    .then(res=>{
        //     setDeliverymens(res.data)
        //    })
            return result.data
        }
    })

    const onSubmit = async (data) => {
        console.log(data)
        const assignInfo = {
            delivery_men_id: data.delivery_men_id,
            appr_delivery_date: data.appr_delivery_date,
            status: 'ontheway'
        }
        console.log(assignInfo)
        const result = await axiousSecure.put(`/manageDeliverymen/${data._id}`, assignInfo)
        if (result.data.modifiedCount > 0) {
            Swal.fire({
                title: "Success!",
                text: "Deliverymen assign Success!",
                icon: "success"
            });
        }
    }
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
                                        <td>{parcel.booking_date}</td>
                                        <td>{parcel.delivery_date}</td>
                                        <td>{parcel.price}</td>
                                        <td>{parcel.status}</td>
                                        <th>
                                            <button className="btn" onClick={() => document.getElementById(`my_modal-${parcel._id}`).showModal()}>Mange</button>
                                            <dialog id={`my_modal-${parcel._id}`} className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg">Manage  Delivery man</h3>
                                                   
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <input type="hidden" {...register("_id", { required: true, })} defaultValue={parcel._id} />
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">DeliveryMen Id</span>
                                                            </label>
                                                            <select defaultValue="default" {...register("delivery_men_id", { required: true, })} className="select select-bordered">
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
                                                            <input type="text" {...register("appr_delivery_date", { required: true, })} placeholder="Approximate Delivery date" className="input input-bordered" />
                                                            {errors.appr_delivery_date?.type === "required" && <span className="text-red-900">Approximate Delivery field is required</span>}
                                                        </div>
                                                        <div className="form-control mt-6">
                                                            <button type="submit" className="btn btn-primary">Assign</button>
                                                        </div>
                                                    </form>
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
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

export default AllParcel;