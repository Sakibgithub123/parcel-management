import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiousSecure from "../../../../hook/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";


const Reviews = () => {
    const {user}=useContext(AuthContext)
    const axiousSecure = useAxiousSecure();

    const { data: deliverymenId } = useQuery({
        queryKey: ['deliverymenId'],
        queryFn: async () => {
            const result = await useAxiousSecure.get(`/deliverymenId/${user?.email}`)
            return result.data
        }
    })
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/reviews/${deliverymenId._id}`)
            refetch()
            return result.data
        }
    })
    console.log(reviews)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                reviews.map(review=>
                    <>
                    <div className="card  bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={review.image} />
                        </div>
                    </div>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{review.name}</h2>
                    <p>Rating : {review.rating}</p>
                    <p> {review.feedback}</p>

                </div>
            </div>
                    
                    
                    </>
                    
                    
                    )
            }
            
        </div>
    );
};

export default Reviews;