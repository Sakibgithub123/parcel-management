import banner from "../../assets/Banner/banner.jpg"
import { TypeAnimation } from 'react-type-animation';

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-[#0f394c]">Hey! Welcome...</h1>
                    <TypeAnimation
                        splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
                        sequence={[
                            `We're so excited to have you as part of our team. 
                            We're glad you've chosen us, and we want to show our appreciation by giving you a special incentive.Thank you for joining us!`,
                            3000,
                            '',
                        ]}
                        speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
                        omitDeletionAnimation={true}
                        style={{ fontSize: '1em', display: 'block', fontWeight: '700' }}
                        repeat={Infinity}
                    />
                    <input type="text" placeholder="Search here" className="input input-bordered border-[#00a6eb] font-semibold w-full my-3 max-w-xs" />
                </div>
            </div>
        </div>
    );
};

export default Banner;