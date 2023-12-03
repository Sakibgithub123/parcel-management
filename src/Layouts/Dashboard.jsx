import { Link, NavLink, Outlet } from "react-router-dom";
import parcelLogo from "../assets/Banner/parcellogo.png"

import { IoBook } from "react-icons/io5";
import { ImCart } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { FcStatistics } from "react-icons/fc";
import { FaCarTunnel, FaLock } from "react-icons/fa6";
import { PiUsersFourFill } from "react-icons/pi";
import { GiDeliveryDrone } from "react-icons/gi";
import { FaRectangleList } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import useUser from "../hook/useUser";
import useAdmin from "../hook/useAdmin";
import useIsDeliverymen from "../hook/useIsDeliverymen";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";
const Dashboard = () => {
    const [isUser] = useUser()
    const [isAdmin] = useAdmin()
    const [isDeliverymen] = useIsDeliverymen()
    const { userLogout } = useContext(AuthContext)

    const handleLogOut=()=>{
        userLogout()
        .then(()=>{})
        .catch()

    }

    return (
        <div className="flex">
            <div className="w-70 min-h-screen bg-lime-400 text-[#023b6d] font-semibold text-base py-10 mr-8">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
                <ul className="menu w-50 ">
                    {isUser ?
                        <>
                            <div className="divider text-lg font-bold bg-white rounded-2xl"><img className="text-center" src={parcelLogo} width={96} alt="" /></div>
                            <div className="divider text-lg font-bold text-[#000] border-t-2  border-b-2 p-4">Dashboard</div>
                            <li>
                                <NavLink to='/dashboard/bookParcel'> <IoBook></IoBook>Book a Parcel </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myParcel'> <ImCart></ImCart>My Parcel </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/myProfile'><CgProfile></CgProfile>My Profile </NavLink>
                            </li>
                        </>
                        : ""

                    }
                    {
                        isAdmin ?
                            <>
                                <div className="divider text-lg font-bold bg-white rounded-2xl"><img className="text-center" src={parcelLogo} width={96} alt="" /></div>
                                <div className="divider text-lg font-bold text-[#000] border-t-2  border-b-2 p-4">Admin Dashboard</div>

                                <li>
                                    <NavLink to='/dashboard/statistics'><FcStatistics></FcStatistics>Statistics </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allParcels'> <FaCarTunnel></FaCarTunnel>All Parcels </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allUsers'> <PiUsersFourFill></PiUsersFourFill>All Users  </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allDeliverymen'> <GiDeliveryDrone></GiDeliveryDrone>All Delivery Men  </NavLink>
                                </li>

                            </>
                            : ""
                    }

                    {
                        isDeliverymen ?
                            <>
                                <div className="divider text-lg font-bold bg-white rounded-2xl"><img className="text-center" src={parcelLogo} width={96} alt="" /></div>
                                <div className="divider text-lg font-bold text-[#000] border-t-2  border-b-2 p-4"> Delivery Men Dashboard</div>
                                <li>
                                    <NavLink to='/dashboard/myDeliveryList'> <FaRectangleList></FaRectangleList>My Delivery List  </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reviews'> <MdRateReview></MdRateReview>Reviews  </NavLink>
                                </li>

                            </>
                            : ""
                    }



                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'> <FaHome></FaHome>Home</NavLink>
                        <Link onClick={handleLogOut}> <FaLock></FaLock>Logout</Link>
                    </li>

                </ul>

            </div>
            <div className="divider"></div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;