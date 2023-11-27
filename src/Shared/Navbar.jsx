import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const { user, userLogout } = useContext(AuthContext)

    const handleLogOut=()=>{
        userLogout()
        .then(()=>{})
        .catch()

    }
    const navItems =
        <>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
            <li className="dropdown dropdown-bottom">
                {/* <label tabIndex={0} >Parent</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul> */}
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    {/* <li> */}
                    <p className="ml-3 text-lg font-extrabold">
                        User Name
                    </p>
                    {/* </li> */}
                    <li><a>Dashboard</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </li>



        </>



    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navItems
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">eParcel</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navItems
                    }
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {
                    user ?
                        <button onClick={handleLogOut}>Logout</button>
                        :
                        <div>
                            <Link to={'/login'} className="btn">Login</Link>
                            <Link to={'/signup'} className="btn">Signup</Link>
                        </div>
                }

            </div>
        </div>
    );
};

export default Navbar;