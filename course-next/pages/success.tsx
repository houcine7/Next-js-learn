import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Success = () => {
  const router = useRouter();

  const customerId = router.query.customerid;
  console.log(customerId);

  //
  const ftc = async () => {
    const response = await axios.get(
      "/api/stripe/customers/paymentMethod?customerId=" + customerId
    );

    const updateResp = await axios.put(
      "/api/stripe/customers/paymentMethod/setDefaultPaymentMethod",
      {
        //
        paymentMethodId: response.data,
        customerId: customerId,
      }
    );

    console.log(response.data);
  };

  if (customerId != undefined) {
    ftc();
  }

  return (
    <div className="flex flex-col items-center text-center font-bold text-black tracking-wider">
      <h1 className="mb-4">success payement: Now you are a proMember</h1>
      <Image
        src={"/images/proMember.png"}
        alt="success"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Success;
