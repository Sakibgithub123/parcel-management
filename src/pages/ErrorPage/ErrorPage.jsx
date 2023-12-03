import { useRouteError } from "react-router-dom";
import notfoundimg from "../../assets/Banner/notFound.webp"

const ErrorPage = () => {
    const error=useRouteError()
    return (
        <div id="error-page">

        <p className="text-center mt-10" >
          <i className="text-3xl">{error.statusText || error.message}</i>
          <div className="flex flex-row justify-center items-center">
          <img src={notfoundimg} alt="" />
          </div>
        </p>
      </div>
    );
};

export default ErrorPage;