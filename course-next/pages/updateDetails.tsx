import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent, loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#fff",
      borderRadius: "4px",
      padding: "12px",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      border: "1px solid #dcdcdc",
      boxSizing: "border-box",
    },
  },
};

function CardForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [cardValues, setCardValues] = useState({
    card: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const handleChange = (event: StripeCardElementChangeEvent) => {
    if (event.error) {
      // Handle card validation error
    }

    console.log("EVENT:", event);

    // Update the card values state
    setCardValues({
      ...cardValues,
      [event.elementType as string]: event.value.postalCode,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Handle missing stripe or elements objects
      return;
    }

    const cardElement = elements.getElement(CardElement);

    console.log(cardElement);
    //create payment method
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
      billing_details: {
        name: "houcine",
        email: "houcine444@gmail.com",
      },
    });

    //handel product subscription
    console.log("[PaymentMethod]", payload.paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-input-wrapper">
        <CardElement options={cardElementOptions} onChange={handleChange} />
      </div>
      <button type="submit">Update Card</button>

      <div>
        <p>Card Number: {cardValues.card}</p>
        <p>Card Expiry: {cardValues.cardExpiry}</p>
        <p>Card CVC: {cardValues.cardCvc}</p>
      </div>

      <style jsx>{`
        .card-input-wrapper {
          margin-bottom: 20px;
        }

        .card-input-wrapper :global(.CardElement) {
          width: 100%;
          display: block;
        }
      `}</style>
    </form>
  );
}

export default function Page() {
  const dummyPaymentMethod = "pm_1NPa4EKKnXpojv6BlPabIzb4";
  const customer = "cus_OBvVa4fat3LZsN";

  const handelUpdate = async () => {
    try {
      const res = await axios.put("/api/stripe/customers", {
        //
        customerId: customer,
        paymentMethodId: dummyPaymentMethod,
      });
      console.log(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="checkout">
      <h1>Update Card Details</h1>
      <Elements stripe={stripePromise}>
        <CardForm />
      </Elements>

      <div className="mt-10 flex justify-center">
        <button
          className="bg-red-400 rounded-md py-2 px-3"
          onClick={handelUpdate}
        >
          update customer card
        </button>
      </div>
    </div>
  );
}
