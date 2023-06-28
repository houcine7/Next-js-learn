import React, { useState } from "react";
import { PaymentIntent, loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

type SubscriptionData = {
  subscriptionId: string;
  clientSecret: string;
};

const dummyData = {
  clientSecret: "pi_3NO7YuKKnXpojv6B0fYCtijd_secret_sY9b3Lca7824P21zlfPOlCnzS",
  subscriptionId: "sub_1NO7YtKKnXpojv6BYtB8nnIT",
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

const Subscribe = () => {
  // Get the lookup key for the price from the previous page redirect.
  //   const [clientSecret] = useState(location.state.clientSecret);
  //   const [subscriptionId] = useState(location.state.subscriptionId);
  const [name, setName] = useState("Jenny Rosen");
  const [messages, _setMessages] = useState("");
  const [paymentIntent, setPaymentIntent] = useState<
    PaymentIntent | undefined
  >();
  const stripe = useStripe();
  const elements = useElements();

  // helper for displaying status messages.
  const setMessage = (message: string) => {
    _setMessages(`${messages}\n\n${message}`);
  };

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

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use card Element to tokenize payment details
    if (cardElement != null) {
      let { error, paymentIntent } = await stripe.confirmCardPayment(
        dummyData.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: name,
            },
          },
        }
      );

      console.log("Payment INTENT: " + paymentIntent);

      if (error) {
        // show error and collect new card details.
        console.log("Error: " + error.message);
        return;
      }
    }
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
      <h1>Subscribe</h1>

      <p>
        Try the successful test card: <span>4242424242424242</span>.
      </p>

      <p>
        Try the test card that requires SCA: <span>4000002500003155</span>.
      </p>

      <p>
        Use any <i>future</i> expiry date, CVC,5 digit postal code
      </p>

      <hr />

      <form onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <CardElement />

        <button>Subscribe</button>
      </form>
      <div>{messages}</div>
    </>
  );
};

export default function Page() {
  return (
    <Elements stripe={stripePromise}>
      <Subscribe />
    </Elements>
  );
}
