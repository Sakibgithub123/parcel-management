import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import avater from "../assets/Banner/avater.png"
import parcelLogo from "../assets/Banner/parcellogo.png"
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
    const { user, userLogout } = useContext(AuthContext)

    const handleLogOut=()=>{
        userLogout()
        .then(()=>{})
        .catch()

    }
    const navItems =
        <>
            <li className="font-semibold text-base"><NavLink to={'/'}>Home</NavLink></li>
            <li className="font-semibold text-base"><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
            <li className="dropdown dropdown-bottom">
               
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        {
                            user?.photoURL?
                            <img alt="avater" src={user?.photoURL} />
                            :
                            <img alt="avater" src={avater} />

                        }
                        
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 text-[#000] z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    {/* <li> */}
                    <p className="ml-3 text-lg font-extrabold">
                        {user?.displayName? user?.displayName :<Link to={'/login'}>Please Login</Link>}
                    </p>
                    {/* </li> */}
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li onClick={handleLogOut}><a>Logout</a></li>
                </ul>
            </li>



        </>



    return (
        <div className="navbar bg-[#023b6d] shadow mb-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu text-[#ffffff] bg-[#023b6d] font-medium menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                        {
                            navItems
                        }
                    </ul>
                </div>
                <a className=" text-2xl font-bold text-center"><span className="text-[#00a6eb]">e</span><span className="text-[#ffffff]">Parcel</span> <img src={parcelLogo} className="my-1" width={96} alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1  text-[#ffffff]">
                    {
                        navItems
                    }
                </ul>
            </div>
            <div className="navbar-end gap-3">
            <button  className=" text-[#ffffff] outline-none border-none"><IoNotifications></IoNotifications></button>
                {
                    user ?
                        <button onClick={handleLogOut} className="btn text-[#ffffff] bg-[#00a6eb] outline-none border-none">Logout</button>
                        :
                        <div className="flex flex-row">
                            <Link  to={'/login'} className="btn text-[#ffffff] bg-[#00a6eb] outline-none border-none mx-3 ">Login</Link>
                            <Link to={'/signup'} className="btn text-[#ffffff] bg-[#00a6eb] outline-none border-none">Signup</Link>
                        </div>
                }

            </div>
        </div>
    );
};

export default Navbar;