
import useAxiousSecure from "../../../hook/useAxiousSecure";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";


const Branches = () => {
    const axiousSecure = useAxiousSecure();
    const [allBranch, setAllBranch] = useState([])
    const [filterBranch, setFilterBranch] = useState([])
    useEffect(() => {
        axiousSecure.get('/branch/')
            .then(res => {
                // 
                // return res.data
                setAllBranch(res.data)
                setFilterBranch(res.data)
            })

    }, [])
    const handleFilter = e => {
        e.preventDefault()
        const form = e.target;
        const branchname = form.branchname.value
        const filterbranch = allBranch.filter(parcel => parcel.branch_name === branchname)
        setFilterBranch(filterbranch)



    }

    return (
        <div>
             <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">ALl Branch</h3>
            </div>
            <Helmet>
                <title>|Branch</title>
            </Helmet>
            <form onSubmit={handleFilter} >
                    <div className="py-2  form-control ">
                        <p className="label-text font-semibold text-lg text-center text-lime-900 py-3">Search By Branch Name</p>
                        <input type="text" name="branchname" placeholder="Enter branch name" className="input input-bordered border-green-400 text-gray-400 font-semibold w-full" />
                        <button className="bg-green-400 font-bold text-[#ffffff] py-2 px-3 rounded-sm my-2">Search</button>
                    </div>
            </form>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="font-semibold text-base text-lime-900 uppercase border-b-2" >
                        <tr>
                            <th>Branch Name</th>
                            <th>Branch Location</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody className="font-semibold text-sm text-[#554f4f]">
                        {
                            filterBranch.map(branche =>
                                <>
                                    <tr key={branche._id}>
                                        <td>
                                            {branche.branch_name}
                                        </td>
                                        <td>{branche.branch_location}</td>
                                        <td>
                                            {branche.phone}
                                        </td>
                                    </tr>
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default Branches;