import { Helmet } from "react-helmet";
import Banner from "./Banner";
import Feature from "./Feature";
import TopDeliveryMan from "./TopDeliveryMan";
import OurClient from "./OurClient";
import Location from "./Location";


const Home = () => {
    return (
        <div className="space-y-5">
            <Helmet>
                <title>|Home</title>
            </Helmet>
            <Banner></Banner>
            <Feature></Feature>
            <TopDeliveryMan></TopDeliveryMan>
            <OurClient></OurClient>
            <Location></Location>
            
        </div>
    );
};

export default Home;