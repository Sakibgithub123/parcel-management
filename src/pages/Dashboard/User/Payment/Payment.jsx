import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet";

// VITE_STRIPE_KEY
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const Payment = () => {
    return (
        <div>
              <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">Payment</h3>
            </div>
            <Helmet>
                <title>|Payment</title>
            </Helmet>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;