import axios from "axios";
import Image from "next/image";
import React from "react";

const Plans = () => {
  const handleClick = async () => {
    //make api request to create customer

    const response = await axios.post("/api/stripe/customers", {
      email: "hello@example.com",
    });

    const subscription = await axios.post("/api/stripe/subscriptions", {
      customerId: response.data.id,
    });

    console.log(subscription);

    //redirect to checkout page
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
          <button
            className="bg-red-500 rounded text-white px-4 py-1"
            onClick={handleClick}
          >
            Upgrade to pro plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
