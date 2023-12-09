import { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from 'sweetalert2'
import useAxiousSecure from "../../../../hook/useAxiousSecure";
import { Helmet } from "react-helmet";

const ParcelUpdatePage = () => {
    const { user } = useContext(AuthContext)
    const axiousSecure = useAxiousSecure()
    const disabled = true;
    const { _id, phone, parcel_type, parcel_weight, reciever_name, reciever_phone_no, delivery_address,
        delivery_date,
        delivery_latitude,
        delivery_longitude,  status } = useLoaderData()

    const [weightPrice, setWeightPrice] = useState(null)
    const readOnly = true;
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const parcelDetails = {
            name: data.name,
            // email:data.email,
            phone: data.phone,
            parcel_type: data.parcel_type,
            parcel_weight: data.parcel_weight,
            reciever_name: data.reciever_name,
            reciever_phone_no: data.reciever_phone_no,
            delivery_address: data.delivery_address,
            delivery_date: data.delivery_date,
            delivery_latitude: data.delivery_latitude,
            delivery_longitude: data.delivery_longitude,
            price: parseFloat(data.price),
            // status:'pending',
        }
        const bookParcel = await axiousSecure.patch(`/updateParcel/${_id}`, parcelDetails)
        if (bookParcel.data.modifiedCount > 0) {

            Swal.fire({
                title: "Success!",
                text: "Parcel Booking Update Successfully!",
                icon: "success"
            });

        }
    }
    const handlePrice = (e) => {
        const weight = e.target.value;
        const Weight_price = parseFloat(weight * 50)
        // console.log(Weight_price)
        setWeightPrice(Weight_price);
    }
    return (
        <div>
            <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">Update Parcel</h3>
            </div>
            <Helmet>
                <title>|ParcelUpdate</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body font-semibold shadow-lg">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: true, })} defaultValue={user.displayName} placeholder="Name" className="input input-bordered bg-slate-200" />
                    {errors.name?.type === "required" && <span className="text-red-900">Name  field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true, })} readOnly={readOnly} defaultValue={user.email} placeholder="email" className="input input-bordered bg-slate-200" />
                    {errors.email?.type === "required" && <span className="text-red-900">Email  field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input type="text" defaultValue={phone} {...register("phone", { required: true, })} placeholder="phone" className="input input-bordered bg-slate-200" />
                    {errors.phone?.type === "required" && <span className="text-red-900">Phone  field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Parcel Type</span>
                    </label>
                    <input type="text" {...register("parcel_type", { required: true, })} defaultValue={parcel_type} placeholder="parcel type" className="input input-bordered bg-slate-200" />
                    {errors.parcel_type?.type === "required" && <span className="text-red-900">Parcel Type field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Parcel Weight</span>
                    </label>
                    <input type="text" defaultValue={parcel_weight} onKeyUp={handlePrice} {...register("parcel_weight", { required: true, })} placeholder="parcel weight" className="input input-bordered bg-slate-200" />
                    {errors.parcel_weight?.type === "required" && <span className="text-red-900">Parcel Weight field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Reciever's Name</span>
                    </label>
                    <input type="text" defaultValue={reciever_name} {...register("reciever_name", { required: true, })} placeholder="reciever name" className="input input-bordered bg-slate-200" />
                    {errors.reciever_name?.type === "required" && <span className="text-red-900">Reciver's Name field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Reciver's Phone No.</span>
                    </label>
                    <input type="text" defaultValue={reciever_phone_no} {...register("reciever_phone_no", { required: true, })} placeholder="reciever phone number" className="input input-bordered bg-slate-200" />
                    {errors.reciever_phone_no?.type === "required" && <span className="text-red-900">Reciver's Phone No. field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Parcel Delivery Address</span>
                    </label>
                    <input type="text" defaultValue={delivery_address} {...register("delivery_address", { required: true, })} placeholder="parcel delivery address" className="input input-bordered bg-slate-200" />
                    {errors.delivery_address?.type === "required" && <span className="text-red-900">Parcel Delivery Address field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Requested Delivery Date</span>
                    </label>
                    <input type="date" defaultValue={delivery_date} {...register("delivery_date", { required: true, })} placeholder="Requested Delivery Date" className="input input-bordered bg-slate-200" />
                    {errors.delivery_date?.type === "required" && <span className="text-red-900">Requested Delivery Date field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Delivery Address Latitude</span>
                    </label>
                    <input type="text" defaultValue={delivery_latitude} {...register("delivery_latitude", { required: true, })} placeholder="Delivery Address Latitude" className="input input-bordered bg-slate-200" />
                    {errors.delivery_latitude?.type === "required" && <span className="text-red-900">Delivery Address Latitude field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Delivery Address Longitude</span>
                    </label>
                    <input type="text" defaultValue={delivery_longitude} {...register("delivery_longitude", { required: true, })} placeholder="Delivery Address Longitude" className="input input-bordered bg-slate-200" />
                    {errors.delivery_longitude?.type === "required" && <span className="text-red-900">Delivery Address Longitude field is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="text" readOnly={readOnly} defaultValue={weightPrice} {...register("price", { required: true, })} placeholder="price" className="input input-bordered bg-slate-200" />
                    {errors.price?.type === "required" && <span className="text-red-900">Price field is required</span>}
                </div>
                <div className="form-control mt-6">
                    {
                        status === 'pending' ?
                            <button type="submit" className="btn bg-lime-900 text-[#ffffff]">Update Parcel</button>
                            : <div className="space-y-3">
                                <p> <button type="submit" disabled={disabled} className="btn bg-lime-900 text-[#ffffff]">Update Parcel</button></p>
                                <p className="text-warning"><span className="font-semibold">Node : </span>
                                    You can update the booking only if the booking status is ‘pending’.</p>
                            </div>
                    }

                </div>
            </form>

        </div>
    );
};

export default ParcelUpdatePage;