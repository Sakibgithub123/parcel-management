import Swal from 'sweetalert2'
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form"
import useAxiousSecure from '../../../hook/useAxiousSecure';
import { useQuery } from '@tanstack/react-query';
const AddBranch = () => {
    const axiousSecure = useAxiousSecure()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const parcelDetails = {
            branch_name: data.branch_name,
            branch_location: data.branch_location,
            phone: data.phone,

        }
        const bookParcel = await axiousSecure.post('/branch', parcelDetails)
        if (bookParcel.data.insertedId) {
            Swal.fire({
                title: "Success!",
                text: "Add Branch< Successfully Done!",
                icon: "success"
            });

        }
    }
    const { data: branches = [], refetch } = useQuery({
        queryKey: ['branches'],
        queryFn: async () => {
            const result = await axiousSecure.get('/branch/')
            return result.data
        }
    })
    // handle delete
    const handleDeleteBranch = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete this this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const cancelParcel = await axiousSecure.patch(`/branch/${id}`)
                if (cancelParcel.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Cancel!",
                        text: "Branch has been deleted.",
                        icon: "success"
                    });
                    refetch()

                }
            }
        });
    }



    return (
        <div>
            <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">Add Branch</h3>
            </div>
            <Helmet>
                <title>|AddBranch</title>
            </Helmet>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body font-semibold shadow-lg">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Branch Name</span>
                        </label>
                        <input type="text" {...register("branch_name", { required: true, })} placeholder="Branch Name" className="input input-bordered  bg-slate-200" />
                        {errors.branch_name?.type === "required" && <span className="text-red-900">Branch Name  field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Branch Location</span>
                        </label>
                        <input type="text" {...register("branch_location", { required: true, })} placeholder="Branch Location" className="input input-bordered  bg-slate-200" />
                        {errors.branch_location?.type === "required" && <span className="text-red-900">Branch Location  field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input type="text" {...register("phone", { required: true, })} placeholder="phone" className="input input-bordered bg-slate-200" />
                        {errors.phone?.type === "required" && <span className="text-red-900">Phone  field is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-lime-900 text-[#ffffff]">Add Branch</button>
                    </div>
                </form>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="font-semibold text-base text-lime-900 uppercase border-b-2" >
                        <tr>
                            <th>Branch Name</th>
                            <th>Branch Location</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="font-semibold text-sm text-[#554f4f]">
                        {
                            branches.map(branche =>
                                <>
                                    <tr key={branche._id}>
                                        <td>
                                            {branche.branch_name}
                                        </td>
                                        <td>{branche.branch_location}</td>
                                        <td>
                                            {branche.phone}
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteBranch(branche._id)} className="bg-red-400 text-[#ffffff] py-2 px-3 my-2 mx-2 rounded-sm">Delete</button>
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

export default AddBranch;