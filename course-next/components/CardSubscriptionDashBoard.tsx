import Image from "next/image";
import React from "react";

export type PropCardType = {
  title: string;
  count: number;
  countType: string;
  briefDesc: string;
  widthICon: number;
  heightIcon: number;
  color: string;
  imageUrl: string;
};

const CardSubscriptionDashBoard = ({
  title,
  count,
  countType,
  briefDesc,
  widthICon,
  heightIcon,
  color,
  imageUrl,
}: PropCardType) => {
  return (
    <div className="card w-full bg-white shadow-2xl rounded-md px-3 py-2">
      <div className="flex gap-8 items-center justify-center">
        <div className="">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-gray-900 text-base font-bold">
            {count} {countType}
          </p>
          <p className={`text-${color}-400 text-xs`}>{briefDesc}</p>
        </div>
        <div>
          <Image
            src={imageUrl}
            alt="icon card"
            width={widthICon}
            height={heightIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSubscriptionDashBoard;
