import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-700 mr-8">
                <ul className="menu">
                    <li>
                        <NavLink to='/dashboard/bookParcel'>Book a Parcel </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/myParcel'>My Parcel </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/myProfile'>My Profile </NavLink>
                    </li>

                    <div className="divider">Admin</div>

                    <li>
                        <NavLink to='/dashboard/statistics'>Statistics </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/allParcels'>All Parcels </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/allUsers'>All Users  </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/allDeliverymen'>All Delivery Men  </NavLink>
                    </li>
                    <div className="divider">Admin</div>
                    <li>
                        <NavLink to='/dashboard/myDeliveryList'>My Delivery List  </NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/reviews'>Reviews  </NavLink>
                    </li>
                   
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>Home  </NavLink>
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