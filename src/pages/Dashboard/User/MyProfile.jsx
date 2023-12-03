import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiousSecure from "../../../hook/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyProfile = () => {
    const {user}=useContext(AuthContext)
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
  
    return (
       <div className="mt-30">
          <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">My Profile</h3>
            </div>
            <Helmet>
                <title>|MyProfile</title>
            </Helmet>
         <div className="flex justify-center items-center">
          
            <div className="card w-96 bg-lime-600 text-[#ffffff]   font-medium shadow-2xl mt-0">
                <figure className="px-10 pt-10">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={profile.image} />
                        </div>
                    </div>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-lime-400 font-bold text-xl">{profile.name}</h2>
                    <p>Email : {profile.email}</p>
                    <div className="card-actions">
                        <Link to={`/dashboard/updateProfile/${profile._id}`}><button className="bg-lime-400 text-[#ffffff] py-2 px-3 rounded-sm my-2 mx-2">Update</button></Link>
                    </div>
                </div>
            </div>
        </div>
       </div>


    );
};

export default MyProfile;