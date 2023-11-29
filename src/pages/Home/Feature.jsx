import feature1 from "../../assets/Feature/feature1.png"
import feature2 from "../../assets/Feature/feature2.png"
import feature3 from "../../assets/Feature/feature3.png"
import SectionTitle from "../../components/SectionTitle"

import CountUp from 'react-countup';
import useAxiousSecure from "../../hook/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";

const Feature = () => {
    const axiousSecure=useAxiousSecure()

    const {data:featureCount={},refetch}=useQuery({
        queryKey:['featureCount'],
        queryFn:async()=>{
            refetch()
            const res =await axiousSecure.get('/featureCount')
            return res.data
        }
    })
   
   
    return (
        <div>
            <SectionTitle heading="our features"></SectionTitle>
            <div className="grid grid-cols-3 gap-10 my-10">
          <div className="bg-base-400 shadow p-5">
          <div className="flex flex-row justify-center items-center gap-10">
                <div><img className="w-24" src={feature1} alt="" /></div>
                <div><h3 className="text-2xl font-semibold">Timely Delivery</h3></div>
            </div>
            <p className="p-5 text-justify leading-6">Courier Companies offer various services for their customer’s satisfaction. One of the major features provided by Courier Services is timely courier delivery.
                 Moreover, courier companies guarantee their customers a specific delivery time frame.</p>
          </div>
          <div className="bg-base-400 shadow p-5">
          <div className="flex flex-row justify-center items-center gap-10">
                <div><img className="w-24" src={feature2} alt="" /></div>
                <div><h3 className="text-2xl font-semibold">Online Tracking</h3></div>
            </div>
            <p className="p-5 text-justify leading-6">All Courier Tracking Services provide the facility of online tracking.
             Customers can check if their parcel has been received at the facility or parcel has been delivered.</p>
          </div>
          <div className="bg-base-400 shadow p-5">
          <div className="flex flex-row justify-center items-center gap-10">
                <div><img className="w-24" src={feature3} alt="" /></div>
                <div><h3 className="text-2xl font-semibold">Pickup & Drop-off</h3></div>
            </div>
            <p className="p-5 text-justify leading-6">Sometimes, various courier companies provide free pickup services to customers. With this service, customers don’t need to visit any outlet or branch of the company.
             The team picks up the customer’s parcel and delivers it to the recipient’s destination.</p>
          </div>

             
        </div>
         {/* show a statistics of your app usage in 3 cards */}
         <div className="bg-[#272727] p-5 mb-10">
            <div className="flex flex-row justify-between items-center">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-[#fff]">Parcel Booked</h3>
                    <h2 className="text-4xl font-semibold text-[#fff]"><CountUp start={0} end={featureCount.totalBooked} delay={5} enableScrollSpy /></h2>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-[#fff]">Parcel Delivered</h3>
                    <h2 className="text-4xl font-semibold text-[#fff]"> <CountUp start={0} end={featureCount.totalDeliverey} delay={5} enableScrollSpy/> </h2>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text text-[#fff]">Our Customers</h3>
                    <h2 className="text-4xl font-semibold text-[#fff]"><CountUp start={0} end={featureCount.totalUser} delay={5} enableScrollSpy/>  </h2>
                </div>
            </div>

         </div>
        </div>
    );
};

export default Feature;