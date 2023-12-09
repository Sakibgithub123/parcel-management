import SectionTitle from "../../components/SectionTitle";
import img1 from "../../assets/ClientLogo/aramex.png"
import img2 from "../../assets/ClientLogo/bluedart.png"
import img3 from "../../assets/ClientLogo/fedex.png"
import img4 from "../../assets/ClientLogo/pickrr.png"
import img5 from "../../assets/ClientLogo/DPD-Logo.png"


const OurClient = () => {
    return (
        <div  >
            <SectionTitle heading="our Clients"></SectionTitle>
            {/* <div className="flex flex-col  lg:flex-row justify-between my-10"> */}
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-5   lg:h-6 text-center gap-10 my-10">
                <img className="w-full  md:h-8 md:w-96 p-4 md:p-0" src={img1} alt="" />
                <img className="w-full md:h-8 md:w-96 p-4 md:p-0" src={img2} alt="" />
                <img className="w-full md:h-8 md:w-96 p-4 md:p-0" src={img3} alt="" />
                <img className="w-full md:h-8 md:w-96 p-4 md:p-0" src={img4} alt="" />
                <img className="w-full md:h-8 md:w-96 p-4 md:p-0" src={img5} alt="" />
            </div>
            
        </div>
    );
};

export default OurClient;