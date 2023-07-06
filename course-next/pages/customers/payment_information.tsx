import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent, loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
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
      border: "1rem solid #000",
      boxSizing: "border-box",
    },
  },
};

const API_URL = "http://localhost:3000/api";

function CardForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [provideCustomerId, setProviderCustomerId] = useState<string>(
    router.query.provider_customer_id as string
  );

  console.log(provideCustomerId);

  const handelUpdate = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Handle missing stripe or elements objects
      return;
    }
    const cardElement = elements.getElement(CardElement);

    //Loading :
    setIsLoading(true);

    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
      });

      //   console.log("[PaymentMethod]", paymentMethod?.id);
      if (paymentMethod) {
        const { data } = await axios.post(
          API_URL + "/stripe/customers/paymentMethod",
          {
            customerId: provideCustomerId,
            paymentMethodId: paymentMethod.id,
          }
        );
        if (data) {
          // payment method added successfully
          setIsLoading(false);
          // redirect to the final subscription page
          router.push(
            {
              pathname: `/projects/${router.query.external_id}/subscribe`,
              query: {
                external_id: router.query.external_id,
                provider_customer_id: provideCustomerId,
              },
            },
            `/projects/${router.query.external_id}/subscribe`
          );
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="grid grid-cols-2 grid-flow-row h-full items-center">
      <div className="col-span-1 w-full px-8">
        <form>
          <div className="card-input-wrapper">
            <p className="font-semibold pl-2 text-gray-900 text-base text-start">
              Credit Card Details
            </p>
            {provideCustomerId == "" ? (
              <p className="my-4 font-semibold pl-2 text-gray-900 text-base text-start">
                Loading ...
              </p>
            ) : (
              <CardElement options={cardElementOptions} />
            )}
          </div>
          <button
            disabled={isLoading}
            className="bg-green-500  text-white font-bold text-sm duration-700 transition ease-in-out hover:bg-green-800 rounded-md py-3 px-3"
            onClick={handelUpdate}
          >
            {isLoading ? "Loading..." : "Add payment details"}
          </button>
        </form>
      </div>

      <div className="col-span-1 flex flex-col items-center w-full h-full bg-ft py-10 px-8">
        <h1 className="px-8 mb-8 font-bold text-white">
          Please add you payment information to continue
        </h1>
        <Image
          src="/images/credit-card.png"
          alt="for style image"
          width={500}
          height={500}
        />

        <p className="text-lg font-normal tracking-tighter text-white text-center">
          By adding payment information you won{"'"}t get charged for any
          invoices until you complete subscription to the our pro plan
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="checkout w-full h-[100vh]">
      <Elements stripe={stripePromise}>
        <CardForm />
      </Elements>
    </div>
  );
}
