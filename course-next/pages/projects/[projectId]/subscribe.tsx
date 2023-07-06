import AlertDailogBTN from "@/components/AlertDailog";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const API_URL_LAGO_CUSTOMERS = "http://localhost:3000/api/lago/customers";

const Page = () => {
  const router = useRouter();
  const [customerExists, setCustomerExists] = useState(false);

  const { projectId } = router.query;
  console.log(projectId);

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

  const handelContinue = async () => {
    //

    const response = await axios.get(API_URL_LAGO_CUSTOMERS + `/${projectId}`);
    console.log(response);

    if (response.status != 200) {
      setCustomerExists(true);
    }

    if (!customerExists) {
      router.push(
        {
          pathname: "/customers/create-customer",
          query: {
            external_id: projectId && projectId,
          },
        },
        "/customers/create-customer"
      );
    }
  };

  return (
    // cards for pro plan and basic plan
    <div className="flex justify-center gap-10 flex-wrap mt-52">
      <div className="card rounded border border-gray-500">
        <div className=" flex flex-col justify-center items-center">
          <Image
            src="/images/payment.png"
            alt="card-img"
            width={95}
            height={100}
          />
          <AlertDailogBTN
            title="Do you want to continue?"
            desc={
              "To be able to upgrade your project kindly contnue to create your customer account and then confirm payments"
            }
            mainBtnText="Upgrade your plan"
            btnContinue="Continue"
            btnCancel="Cancel"
            handleCancel={() => {}}
            handleContinue={handelContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
