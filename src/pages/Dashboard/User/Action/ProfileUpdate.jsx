import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import useAxiousSecure from "../../../../hook/useAxiousSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
const Image_hosting_key = 'f7e60a735ab4c0b0fbfb6d08328c7dbf';
const Image_hosting_api = `https://api.imgbb.com/1/upload?key=${Image_hosting_key}`

const ProfileUpdate = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const axiousSecure = useAxiousSecure()
    const {user,updateUserProfile}=useContext(AuthContext) 
    const { data: userId } = useQuery({
        queryKey: ['userId'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/users/${user?.email}`)
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
            updateUserProfile(data.name, sentfileImgbb.data.data.display_url)
            .then(async()=>{
                const userInfo = {
                    image: sentfileImgbb.data.data.display_url,
    
                }
                // console.log(userInfo)
                const userRes = await axiousSecure.patch(`https://parcel-management-server-phi.vercel.app/users/${userId._id}`, userInfo)
                if (userRes.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Profile image change success!",
                        icon: "success"
                    });
                }

            })
            .catch(error=>{
                console.error(error)
            })
          
        }

    }

    return (
        <div>
              <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">Update Profile</h3>
            </div>
            <Helmet>
                <title>|ProfileUpdate</title>
            </Helmet>
            <div className="flex justify-center items-center">
            <div className="card w-96 bg-lime-600 p-4 shadow-xl ">
            <h3 className="text-center bg-lime-600 text-[#ffffff] py-4 text-xl font-extrabold uppercase my-3">Upload Your Photo</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-[#ffffff]">Photo</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} placeholder="photo" className="input input-bordered bg-slate-200" />
                        {errors.image?.type === "required" && <span className="text-red-900">Photo field is required</span>}
                    </div>
                    <div className="form-control mt-6">
                            <button className="bg-lime-400 text-[#ffffff] font-semibold py-2 px-3 rounded-sm my-2 mx-2">Save</button>
                        </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default ProfileUpdate;