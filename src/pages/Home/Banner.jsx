import banner from "../../assets/Banner/banner.jpg"

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-[#0f394c]">Hey! Welcome...</h1>
                    <p className="mb-5 text-[#ffffff] font-medium">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    {/* <button className="btn btn-primary">Get Started</button> */}
                    <input type="text" placeholder="Search here" className="input input-bordered border-[#00a6eb] font-semibold w-full max-w-xs" />
                </div>
            </div>
        </div>
    );
};

export default Banner;