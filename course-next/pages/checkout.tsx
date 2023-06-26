import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Checkout = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-4">
      <p className="text-center uppercase text-xl tracking-wider text-gray-800 font-bold">
        {" "}
        Welcome to checkout sir
      </p>
      <div>
        <Image
          src="/images/payment.png"
          alt="payment"
          height={200}
          width={400}
        />
      </div>
      <button
        className="rounded text-white font-bold text-xs py-2 px-3 bg-pink-700 hover:scale-105 transition-all duration-300"
        onClick={() => {
          router.push("/updateDetails");
        }}
      >
        Go checkout <span className="float-right ml-2">{"->"}</span>
      </button>
    </div>
  );
};

export default Checkout;
