import img from "../../assets/Banner/login3.webp"
import googleimg from "../../assets/Banner/googlee.png"
import { useForm } from "react-hook-form"
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const LoginPage = () => {
    const { userLogin, googleLogin } = useContext(AuthContext)
    const location=useLocation();
    const navigate=useNavigate();
    const from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        userLogin(data.email, data.password)
            .then(resut => {
                console.log(resut.user)
                alert("login succcess")
                navigate(from, { replace: true });

            })
            .catch(error => {
                console.error(error)
            })
    }
    const handlegoogleLogin=()=>{
        googleLogin()
        .then((result)=>{
            const userInfo={
                name:result.user.email,
                email:result.user.displayName,
                role:'user'
            }
            axios.post('http://localhost:5000/user',userInfo)
            .then(res=>{
                console.log(res.data)
                navigate(from, { replace: true });
            })
            .catch(error=>{
                console.error(error)
            })
        })

    }

    return (
        <div className=" min-h-screen  my-10">
            <p className="py-6 text-center font-semibold text-2xl">Provident cupiditate voluptatem et in.
                Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                In deleniti eaque aut repudiandae et a id nisi.</p>
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="text-center lg:text-left w-1/3 md:mb-8 ">
                    <h1 className="text-5xl font-bold md:ml-10 mb-4">Login now!</h1>
                    <img className="w-3/4" src={img} alt="" />
                </div>
                <div className="card  w-1/3 shadow-2xl bg-base-100">
                    <h3 className="text-2xl font-bold text-center mb-4">Login</h3>
                    <button onClick={handlegoogleLogin} className="btn flex flex-row justify-center items-center"> <img src={googleimg} width={36} alt="" /><span>Google login</span></button>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true, })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === "required" && <span className="text-red-900">Password field is required</span>}

                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
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

export default LoginPage;