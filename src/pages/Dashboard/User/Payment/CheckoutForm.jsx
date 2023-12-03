import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiousSecure from "../../../../hook/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from 'sweetalert2'

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecret, setclientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const axiousSecure = useAxiousSecure()
    const { user } = useContext(AuthContext)
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const result = await axiousSecure.get(`/parcels/${user.email}`)
            refetch()
            // setAllParcels(result.data)
            return result.data

        }
    })
    const totalPrice = parcels.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        axiousSecure.post('/create-payment-intent')
            .then(res => {
                console.log(res.data.clientSecret)
                setclientSecret(res.data.clientSecret)

            })

    }, [])

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            // card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }
        //cofirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'annonymous',
                    email: user?.email || 'annonymous'
                }
            }
        })
        if (confirmError) {
            console.log('Confirm error')
        } else {
            console.log('payment intent:', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id:', paymentIntent.id)
                setTransactionId(paymentIntent.id)
                const payment={
                    email:user.email,
                    paymentId:paymentIntent.id,
                    price:totalPrice,
                    date:new Date(),
                    status:'pending'
                }
               const res= axiousSecure.post('/payment',payment)
            //    console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    title: "Success!",
                    text: "Payment Successfully Done!",
                    icon: "success"
                  });
    
            }
            }
        }
    };

    return (
        <div>
            <div>
                <h3 className="text-center bg-lime-600 text-lime-500 py-4 text-3xl font-extrabold uppercase my-10">Checkout</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="card bg-base-100">
                    <p className="my-5 text-red-4000">{error}</p>
                    {transactionId && <p className="my-5 text-red-4000">Your Transaction id:{transactionId}</p>}
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#65a30d',
                                    '::placeholder': {
                                        color: '#65a30d',
                                    },
                                },
                                invalid: {
                                    color: '#65a30d',
                                },
                            },
                        }}
                    />
                    <button className="bg-green-400 my-4 font-semibold text-[#ffffff] py-2 px-3 rounded-sm mx-2" type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;