import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../hook/useAxiousSecure";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';


const Statistics = () => {
    const axiousSecure = useAxiousSecure()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiousSecure.get('/admin-stats')
            return res.data;
        }
    })
    console.log(stats)
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
                <p>user:{stats.user}</p>
                <p>Delivrrymrn:{stats.deliverymen}</p>
                <p>revineu:{stats.totalRevenue}</p>

            </div>
            <div>
                <BarChart width={600} height={300} data={chartsdata}>
                    <XAxis dataKey="booking_date" stroke="#8884d8" />
                    <YAxis />
                    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="totalBooking" fill="#8884d8" barSize={30} />
                </BarChart>



            </div>
        </div>
    );

};

export default Statistics;