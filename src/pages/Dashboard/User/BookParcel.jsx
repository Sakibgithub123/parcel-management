
import { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiousSecure from "../../../hook/useAxiousSecure";
import Swal from 'sweetalert2'
const BookParcel = () => {
    const {user}=useContext(AuthContext)
    const axiousSecure=useAxiousSecure()
    const [weightPrice,setWeightPrice]=useState(null)
    // const disabled =true;
    const readOnly=true;
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = async  (data) => {
        console.log(data)
        const parcelDetails={
            name:data.name,
            email:data.email,
            phone:data.phone,
            parcel_type:data.parcel_type,
            parcel_weight:data.parcel_weight,
            reciever_name:data.reciever_name,
            reciever_phone_no:data.reciever_phone_no,
            delivery_address:data.delivery_address,
            delivery_date:data.delivery_date,
            delivery_latitude:data.delivery_latitude,
            delivery_longitude:data.delivery_longitude,
            price:data.price,
            status:'pending',
        }
        const bookParcel=await axiousSecure.post('/bookParcel',parcelDetails)
        if(bookParcel.data.insertedId){
            Swal.fire({
                title: "Success!",
                text: "Parcel Booking Successfully Done!",
                icon: "success"
              });

        }
    }
    
    const handlePrice=(e)=>{
        const weight=e.target.value;
        const Weight_price= parseFloat(weight * 50)
        // console.log(Weight_price)
        setWeightPrice(Weight_price);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true, })}  defaultValue={user.displayName}   placeholder="Name" className="input input-bordered" />
                            {errors.name?.type === "required" && <span className="text-red-900">Name  field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true, })} readOnly={readOnly} defaultValue={user.email}   placeholder="email" className="input input-bordered" />
                            {errors.email?.type === "required" && <span className="text-red-900">Email  field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="text" {...register("phone", { required: true, })}   placeholder="phone" className="input input-bordered" />
                            {errors.phone?.type === "required" && <span className="text-red-900">Phone  field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Parcel Type</span>
                            </label>
                            <input type="text" {...register("parcel_type", { required: true, })}   placeholder="parcel type" className="input input-bordered" />
                            {errors.parcel_type?.type === "required" && <span className="text-red-900">Parcel Type field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Parcel Weight</span>
                            </label>
                            <input type="text" onKeyUp={handlePrice} {...register("parcel_weight", { required: true, })}   placeholder="parcel weight" className="input input-bordered" />
                            {errors.parcel_weight?.type === "required" && <span className="text-red-900">Parcel Weight field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reciever's Name</span>
                            </label>
                            <input type="text" {...register("reciever_name", { required: true, })}   placeholder="reciever name" className="input input-bordered" />
                            {errors.reciever_name?.type === "required" && <span className="text-red-900">Reciver's Name field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reciver's Phone No.</span>
                            </label>
                            <input type="text" {...register("reciever_phone_no", { required: true, })}    placeholder="reciever phone number" className="input input-bordered" />
                            {errors.reciever_phone_no?.type === "required" && <span className="text-red-900">Reciver's Phone No. field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Parcel Delivery Address</span>
                            </label>
                            <input type="text" {...register("delivery_address", { required: true, })}  placeholder="parcel delivery address" className="input input-bordered"/>
                            {errors.delivery_address?.type === "required" && <span className="text-red-900">Parcel Delivery Address field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Requested Delivery Date</span>
                            </label>
                            <input type="date" {...register("delivery_date", { required: true, })}   placeholder="Requested Delivery Date" className="input input-bordered" />
                            {errors.delivery_date?.type === "required" && <span className="text-red-900">Requested Delivery Date field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Delivery Address Latitude</span>
                            </label>
                            <input type="text" {...register("delivery_latitude", { required: true, })}    placeholder="Delivery Address Latitude" className="input input-bordered" />
                            {errors.delivery_latitude?.type === "required" && <span className="text-red-900">Delivery Address Latitude field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Delivery Address Longitude</span>
                            </label>
                            <input type="text" {...register("delivery_longitude", { required: true, })}   placeholder="Delivery Address Longitude" className="input input-bordered"  />
                            {errors.delivery_longitude?.type === "required" && <span className="text-red-900">Delivery Address Longitude field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" readOnly={readOnly} defaultValue={weightPrice} {...register("price", { required: true, })} placeholder="price" className="input input-bordered" />
                            {errors.price?.type === "required" && <span className="text-red-900">Price field is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Book Parcel</button>
                        </div>
                    </form>
        </div>
    );
};

export default BookParcel;