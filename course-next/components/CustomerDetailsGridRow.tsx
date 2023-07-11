import React from "react";

export type PropCustomerDetailsGridRow = {
  grid1Title: string;
  grid1Value?: string;
  grid2Title: string;
  grid2Value?: string;
};

const CustomerDetailsGridRow = ({
  grid1Title,
  grid1Value,
  grid2Title,
  grid2Value,
}: PropCustomerDetailsGridRow) => {
  return (
    <>
      <div className="grid grid-cols-2 items-cente mb-4">
        <div className="col-span-1">
          <p className="text-gray-700"> {grid1Title}</p>
          <p className=" font-semibold">
            {" "}
            {grid1Value || "No " + grid1Title + " added"}
          </p>
        </div>
        <div className="col-span-1">
          <p className="text-gray-700"> {grid2Title}</p>
          <p className="font-semibold">
            {grid2Value || "No " + grid2Title + " added"}
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomerDetailsGridRow;
