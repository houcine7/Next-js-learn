import React from "react";

import { Meetup } from "./MeetupList";
import Image from "next/image";



const MeetupDetails = (props: { meetup: Meetup }) => {
  return (
    <div className="flex justify-center mt-10 mx-auto max-w-4xl fade-in-60 transition duration-500">
      <div className="card">
        <Image
          src="/images/electronic.png"
          alt="first blog"
          className="h-72"
          width={200}
          height={150}
        />
        <h1 className="font-bold text-gray-900 mt-2">{props?.meetup?.title}</h1>
        <p className="description text-gray-800">{props?.meetup?.desc} </p>
      </div>
    </div>
  );
};

export default MeetupDetails;
