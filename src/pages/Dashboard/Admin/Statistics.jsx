import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hook/useAxiousSecure";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Helmet } from "react-helmet";
import { FaDollarSign, FaUser, FaUserAstronaut } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";


const Statistics = () => {
    const axiousSecure = useAxiousSecure()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiousSecure.get('/admin-stats')
            return res.data;
        }
    })
    // console.log(stats)
    const { data: chartsdata = [] } = useQuery({
        queryKey: ['admin-chart'],
        queryFn: async () => {
            const res = await axiousSecure.get('/admin-chart')
            return res.data;
        }
    })

    return (
        <div>
            <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">Statistics</h3>
            </div>
            <Helmet>
                <title>|Statistics</title>
            </Helmet>
            <div className="bg-lime-900">
                <div className="stats shadow flex justify-center gap-10 bg-lime-400">
                    <div className="stat place-items-center">
                        <div className="stat-title text-green-900 font-bold text-xl">Deliverymen</div>
                        <div className="stat-value flex flex-row justify-center items-center "><FaUserAstronaut></FaUserAstronaut> {stats.deliverymen}</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title text-green-900 font-bold text-xl">Users</div>
                        <div className="stat-value text-secondary flex flex-row justify-center items-center"><FaUser></FaUser> {stats.user}</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title text-green-900 font-bold text-xl">Total Booked</div>
                        <div className="stat-value flex flex-row justify-center items-center"><FaDollarSign></FaDollarSign> {stats.totalRevenue}</div>
                    </div>
                </div>
            </div>
            <div className="my-20 flex justify-center"> 
                <BarChart width={600} height={300} data={chartsdata}>
                    <XAxis dataKey="booking_date" stroke="#65a30d" />
                    <YAxis />
                    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#65a30d' }} />
                    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                    <CartesianGrid stroke="#65a30d" strokeDasharray="5 5" />
                    <Bar dataKey="totalBooking" fill="#65a30d" barSize={30} />
                </BarChart>
               



            </div>
        </div>
    );

};

export default Statistics;