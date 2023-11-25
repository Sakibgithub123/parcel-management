import SectionTitle from "../../components/SectionTitle";
import img from "../../assets/Banner/banner.jpg"


const TopDeliveryMan = () => {
    return (
        <div>
            <SectionTitle heading="our top delivery person"></SectionTitle>
            <div className="card card-compact w-96 bg-base-100 shadow-xl my-10">
                <figure><img src={img} alt="Shoes" /></figure>
                <div className="text-center space-y-2 my-5">
                    <h2 className="text-2xl font-semibold">Md Rejal Ali</h2>
                    <p className="text-lg font-semibold">Percel Delivered : 20</p>
                    <div className="rating">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TopDeliveryMan;