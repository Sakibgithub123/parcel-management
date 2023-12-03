import SectionTitle from "../../components/SectionTitle";
import img from "../../assets/Banner/banner.jpg"
import { useEffect, useState } from "react";
import useAxiousSecure from "../../hook/useAxiousSecure";


import '@smastrom/react-rating/style.css'
import TopDelivermanDetails from "./TopDelivermanDetails";


const TopDeliveryMan = () => {
    const axiousSecure = useAxiousSecure()
    const [topDelivery, setTopDelivery] = useState([])
    const [rating, setRating] = useState(0)

    useEffect(() => {
        axiousSecure.get('/deliverymens/')
            .then(res => {
                // 
                // return res.data
                setTopDelivery(res.data)
                // setFilterParcel(res.data)
            })

    }, [])
    return (
        <div>
            <SectionTitle heading="our top delivery person"></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    topDelivery.slice(0, 3).map(topDeliveryman =>
                      <TopDelivermanDetails key={topDeliveryman._id} rating={rating} topDeliveryman={topDeliveryman} setRating={topDeliveryman.totalRating} ></TopDelivermanDetails>


                    )
                }
            </div>


        </div>
    );
};

export default TopDeliveryMan;