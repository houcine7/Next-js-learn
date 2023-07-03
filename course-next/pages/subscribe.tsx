import React, { useEffect, useState } from "react";
import { PaymentIntent, loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { SourceTextModule } from "vm";
import axios from "axios";
import Image from "next/image";

type SubscriptionData = {
  subscriptionId: string;
  clientSecret: string;
};

const phone = "+212654692588";
const email = "houcine88@gmail.com";
const address = "rabat av allal al farisi 546 dhj";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

const Subscribe = () => {
  const [name, setName] = useState("houcine test");
  const [message, setMessage] = useState("");
  const [paymentIntent, setPaymentIntent] = useState<
    PaymentIntent | undefined
  >();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  // Initialize an instance of stripe.
  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return "";
  }

  // When the subscribe-form is submitted we do a few things:
  //
  //   1. Tokenize the payment method
  //   2. Create the subscription
  //   3. Handle any next actions like 3D Secure that are required for SCA.
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // edit this to make this payment as default
    const { error } = await stripe.confirmPayment({
      elements,

      confirmParams: {
        // Make sure to change this to your payment completion page
        expand: ["payment_method"],
        return_url: `${window.location.origin}/success?customerid=${router.query.customerId}`,
        receipt_email: "houssainadl123@gmail.com",
        save_payment_method: true,
        payment_method_data: {
          billing_details: {
            name: "LAHOUCIN EL ADDALI",
            phone: "+2125687495",
          },
        },
      },
    });

    // elements.update({
    //   setup_future_usage: "off_session",
    // });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      console.log(error.message);

      setMessage(error.message || "ERROR from stripe");
    } else {
      console.log(error.message);
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  if (paymentIntent && paymentIntent.status === "succeeded") {
    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. To handle this case, set up a webhook endpoint and
    // listen to invoice.paid. This webhook endpoint returns an Invoice.
    console.log("heeere");

    setMessage("Success! Your test payment succeeded.");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <LinkAuthenticationElement />
        <PaymentElement options={{}} />

        <button
          disabled={isLoading || !stripe || !elements}
          className="px-10 py-3 text-white font-bold mt-4 bg-blue-600 rounded-md w-full"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spin-in-180" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}

        <style jsx>{`
          .p-Fade {
            display: none;
          }
        `}</style>
      </form>
    </>
  );
};

export default function Page() {
  const [clientSecret, setClientSecret] = useState("");

  const router = useRouter();

  // useEffect(() => {
  //   const fetch = async () => {
  //     console.log(router.query.customerId);
  //     console.log(router.query.subscriptionId);

  //     const res = await axios.post("/api/stripe/paymentsIntent", {
  //       customerId: router.query.customerId,
  //       subscriptionId: router.query.subscriptionId,
  //     });
  //     setClientSecret(res.data.clientSecret);

  //     console.log(clientSecret);
  //   };

  //   fetch();
  // }, [clientSecret]);

  return (
    <div className=" grid grid-flow-col grid-cols-2">
      <div className="w-full h-full col-span-1 bg-ft px-10 py-24">
        <div className="flex justify-normal flex-col gap-14 items-center">
          <h1 className="font-bold text-white max-w-md text-center">
            Welcome to checkout! Upgrade your plan to use all our ultimate
            functionalties
          </h1>
          <Image
            src={"/images/payment2.png"}
            height={500}
            width={250}
            alt="payment image"
          />
          <h1 className="tracking-wider font-extrabold text-xl text-white">
            By: FEVERTOKENS
          </h1>
        </div>
      </div>
      <div className="w-full h-full col-span-1 px-10 py-10">
        {router.query.secret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: router.query.secret as string,
            }}
          >
            <Subscribe />
          </Elements>
        )}
      </div>
    </div>
  );
}
