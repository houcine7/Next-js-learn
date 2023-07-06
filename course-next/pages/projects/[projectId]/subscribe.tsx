import AlertDailogBTN from "@/components/AlertDailog";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const API_URL_LAGO_CUSTOMERS = "http://localhost:3000/api/lago/";

const API_URL_STRIPE_CUSTOMERS_PAYMENTMETHODS =
  "http://localhost:3000/api/stripe/customers/paymentMethod";

const Page = () => {
  const router = useRouter();
  const [customerExists, setCustomerExists] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const { external_id, provider_customer_id } = router.query;

  console.log(external_id, provider_customer_id);

  // check if the user is indeed a cosumer an have a payment method else redirect to create customer page
  useEffect(() => {
    // code
    const checkCustomer = async () => {
      let isCustomer = false;
      if (external_id && provider_customer_id) {
        try {
          const { data, status } = await axios.get(
            API_URL_LAGO_CUSTOMERS + `customers/${external_id}`
          );
          isCustomer = true;
          if (status === 200) {
            // check if customer have stipe payment method
            const resStripe = await axios.get(
              API_URL_STRIPE_CUSTOMERS_PAYMENTMETHODS +
                `/?customerId=${provider_customer_id}`
            );
            if (resStripe.status === 200) {
              setIsDisabled(false);
            }
          }
        } catch (err) {
          if (isCustomer) {
            router.push({
              pathname: "/customers/payment_information",
              query: {
                external_id,
                provider_customer_id,
              },
            });
          }
        }
      }
    };

    checkCustomer();
  }, [external_id, provider_customer_id]);

  const handleClick = async () => {
    //make api request to create a subscription for the customer
    try {
      const currentDate = new Date();
      const sub = {
        subscription: {
          external_customer_id: external_id,
          plan_code: process.env.NEXT_PUBLIC_PLAN_CODE,
          external_id:
            "sub_" +
            (external_id as string).split("_")[1] +
            currentDate.getTime(),
          name: "pro plan" + provider_customer_id,
          subscription_at:
            currentDate.toISOString().split("T")[0] + "T00:00:00Z",
          billing_time: "anniversary",
        },
      };

      const response = await axios.post(
        API_URL_LAGO_CUSTOMERS + "subscriptions",
        {
          subscription: sub,
        }
      );

      if (response.status === 200) {
        router.push({
          pathname: "/success",
        });
      }
    } catch (error) {
      console.log("error");
    }

    //redirect to checkout page
  };

  return (
    // cards for pro plan and basic plan
    <div className="flex justify-center  flex-wrap my-24 max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-8">
        <Image
          src="/images/sub.png"
          className="btn-"
          alt="image"
          width={400}
          height={400}
        />

        <button
          disabled={isDisabled}
          className="bg-ft  text-white font-bold text-sm duration-700 transition ease-in-out hover:bg-gray-900 rounded-md py-3 px-3"
          onClick={handleClick}
        >
          Upgrade your project Now
        </button>
        <p className="text-center tracking-wider text-base font-normal text-gray-900 ">
          By clicking you will upgrade your project to pro plan and use our
          exclusive features and you will be charged each mounth with
          subscription fees, Keep in minde that you can always cancel
          subsription or change you payment methods
        </p>
      </div>
    </div>
  );
};

export default Page;
