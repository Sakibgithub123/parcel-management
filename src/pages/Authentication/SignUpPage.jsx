import img from "../../assets/Banner/login3.webp"
import { useForm } from "react-hook-form"


const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = (data) => console.log(data)

    return (
        <div className=" min-h-screen  my-10">
            <p className="py-6 text-center font-semibold text-2xl">Provident cupiditate voluptatem et in.
                Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                In deleniti eaque aut repudiandae et a id nisi.</p>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="text-center lg:text-left w-1/3 md:mb-8 ">
                    <h1 className="text-5xl font-bold md:ml-10 mb-4">SignUp now!</h1>
                    <img className="w-3/4" src={img} alt="" />
                </div>
                <div className="card  w-1/3 shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h3 className="text-2xl font-bold text-center mb-4">SignUp</h3>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                            {errors.name?.type === "required" && <span className="text-red-900">Name field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email", {
                                required: true,
                                pattern: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
                            })} placeholder="email" className="input input-bordered" required />
                            {errors.email?.type === "required" && <span className="text-red-900">Email Field is required</span>}
                            {errors.email?.type === "pattern" && <span className="text-red-900">Enter a valid email address. </span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User type</span>
                            </label>
                            <select defaultValue="default" {...register("role", { required: true })} className="select select-bordered w-full max-w-xs">
                            <option disabled defaultValue="default">Select here...</option>
                            <option value="user">User</option>
                            <option value="deliverymen">DeliveryMen</option>
                        </select>
                        {errors.role?.type === "required" && (
                            <p className="text-red-400">User type is required</p>
                        )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="file" {...register("photo", { required: true })} placeholder="photo" className="input input-bordered" />
                            {errors.photo?.type === "required" && <span className="text-red-900">Photo field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                                pattern: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}/
                            })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === "required" && <span className="text-red-900">Password field is required</span>}
                            {errors.password?.type === "pattern" && <span className="text-red-900">Password must be minimum six characters, at least one letter, one number and one special character.</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <p className="py-6 text-center font-semibold text-2xl">Provident cupiditate voluptatem et in.
                Quaerat fugiat ut assumenda excepturi exercitationem quasi. 
                In deleniti eaque aut repudiandae et a id nisi.</p> */}
        </div>
    );
};

export default SignUpPage;