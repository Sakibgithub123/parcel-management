import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiousSecure from "../../../../hook/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";


const Reviews = () => {
    const { user } = useContext(AuthContext)
    const axiousSecure = useAxiousSecure();

    const { data: deliverymenId } = useQuery({
        queryKey: ['deliverymenId'],
        queryFn: async () => {
            const result = await useAxiousSecure.get(`/deliverymenId/${user?.email}`)
            return result.data
        }
    })
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/reviews/${deliverymenId._id}`)
            return result.data
        }
    })
    // console.log(reviews)

    return (
        <div>
            <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">My reviews</h3>
            </div>
            <Helmet>
                <title>|Reviews</title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {
                reviews.map(review =>
                    <>
                        <div className="card  bg-base-200 border border-lime-400 text-[#ffffff] shadow-2xl">
                            <figure className="px-10 pt-10">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-lime-600 ring-offset-base-100 ring-offset-2">
                                        <img src={review.image} />
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-lime-500 font-bold text-xl">{review.name}</h2>
                                <p className="text-base font-medium text-[#2c2c2c] " ><span className="">Rating :</span> <span className="text-rose-400">{review.rating}</span>/5</p>
                            </div>
                            <p className="leading-8 text-base text-[#4b4b4b] font-medium px-5 pb-5 text-justify"> {review.feedback}</p>
                        </div>
                    </>
                )
            }
        </div>
        </div>
    );
};

export default Reviews;