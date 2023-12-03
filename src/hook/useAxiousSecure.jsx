import axios from "axios";


const axiousSecure=axios.create({
    baseURL:'https://parcel-management-server-phi.vercel.app'
});

const useAxiousSecure = () => {
    return axiousSecure;
};

export default useAxiousSecure;