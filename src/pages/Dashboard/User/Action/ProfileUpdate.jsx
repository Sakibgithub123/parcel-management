import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import useAxiousSecure from "../../../../hook/useAxiousSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
const Image_hosting_key = 'f7e60a735ab4c0b0fbfb6d08328c7dbf';
const Image_hosting_api = `https://api.imgbb.com/1/upload?key=${Image_hosting_key}`

const ProfileUpdate = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const axiousSecure = useAxiousSecure()
    const {user}=useContext(AuthContext) 
    const { data: userId } = useQuery({
        queryKey: ['userId'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/userId/${user?.email}`)
            return result.data
        }
    })
    const onSubmit = async (data) => {
        console.log(data)
        const photoFile = { image: data.image[0] }
        const sentfileImgbb = await axiousSecure.post(Image_hosting_api, photoFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        // console.log(sentfileImgbb.data.data.display_url)
        if (sentfileImgbb.data.success) {
            // console.log(data.display_url)
            const userInfo = {
                image: sentfileImgbb.data.data.display_url,

            }
            // console.log(userInfo)
            const userRes = await axiousSecure.patch(`http://localhost:5000/userimg/${userId._id}`, userInfo)
            if (userRes.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Profile image change success!",
                    icon: "success"
                });
            }
        }

    }

    return (
        <div className="flex justify-center items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
              
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} placeholder="photo" className="input input-bordered" />
                        {errors.image?.type === "required" && <span className="text-red-900">Photo field is required</span>}
                    </div>
                    <div className="form-control mt-6">
                            <button className="btn btn-primary">Signup</button>
                        </div>
                </form>
            </div>


        </div>
    );
};

export default ProfileUpdate;