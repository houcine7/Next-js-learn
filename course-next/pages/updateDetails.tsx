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

  const handelUpdate = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Handle missing stripe or elements objects
      return;
    }
    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
      });

      // console.log("[PaymentMethod]", paymentMethod?.id);
      if (paymentMethod) {
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="grid grid-cols-2 grid-flow-row">
      <div className="col-span-1 w-full h-full px-8">
        <form>
          <div className="card-input-wrapper">
            <CardElement options={cardElementOptions} onChange={handleChange} />
          </div>
          <button
            className="bg-red-400 rounded-md py-2 px-3"
            onClick={handelUpdate}
          >
            update customer card
          </button>
        </form>
      </div>

      <div className="col-span-1 w-full h-[80vh] bg-ft py-10 px-8">
        <h1>You can update your card information here </h1>
      </div>
    </div>
  );
}

export default function Page() {
  const dummyPaymentMethod = "pm_1NPa4EKKnXpojv6BlPabIzb4";
  const customer = "cus_OBvVa4fat3LZsN";

  return (
    <div className="checkout">
      <h1 className="px-8 mb-8 font-semiBold">Update Card Details</h1>
      <Elements stripe={stripePromise}>
        <CardForm />
      </Elements>
    </div>
  );
}
