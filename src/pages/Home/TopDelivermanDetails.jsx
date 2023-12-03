import { Rating } from '@smastrom/react-rating'

const TopDelivermanDetails = ({topDeliveryman,setRating,rating}) => {
    const {image,name,totalDelivered,totalRating}=topDeliveryman;
   
    // setRating(totalRating)
    return (
    
        <div className="card card-compact  bg-base-100 shadow-xl my-10">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="text-center space-y-2 my-5">
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p className="text-lg font-semibold">Percel Delivered : {totalDelivered}</p>
                <div className="rating">
                <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
                </div>
                
            </div>
        </div>



   
    );
};

export default TopDelivermanDetails;