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

const API_URL_LAGO_CUSTOMERS = "http://localhost:3000/api/lago/customers";

const Page = () => {
  const router = useRouter();
  const [customerExists, setCustomerExists] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { projectId } = router.query;

  // check if the user is indeed a cosumer an have a payment method else redirect to create customer page
  useEffect(() => {
    // code
    const checkCustomer = async () => {
      try {
      } catch (err) {}
    };

    checkCustomer();
  }, [projectId]);

  const handleClick = async () => {
    //make api request to create customer
    try {
      const response = await axios.post("/api/stripe/customers", {
        email: "houcine789@example.com",
      });

      const subscription = await axios.post("/api/stripe/subscriptions", {
        customerId: response.data.id,
      });

      console.log(subscription);

      router.push(
        {
          pathname: "/subscribe",
          query: {
            subscriptionId: subscription.data.id,
            secret: subscription.data.secret,
            customerId: response.data.id,
          },
        },
        "/subscribe"
      );
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
