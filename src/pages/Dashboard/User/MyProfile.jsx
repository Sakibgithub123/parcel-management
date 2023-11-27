import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiousSecure from "../../../hook/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";




const MyProfile = () => {
    const {user}=useContext(AuthContext)
    // console.log(user.email)
    // const [myProfile,setMyProfile]=useState();
    const axiousSecure=useAxiousSecure();
    const {data:profile={}}=useQuery({
        queryKey:['profile'],
        queryFn:async()=>{
            const result=await axiousSecure.get(`/profile/${user.email}`);
            // setMyProfile(result.data)
            return result.data
            // console.log(result.data)

        }
    })
    // console.log(profile)

            // const result= axiousSecure.get(`/profile/${user.email}`);
            // console.log(result.data)

   
    return (
        <div className="flex justify-center items-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={profile.image} />
                        </div>
                    </div>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{profile.name}</h2>
                    <p>Email : {profile.email}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default MyProfile;