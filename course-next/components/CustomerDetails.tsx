import { useState } from "react";
import CustomerDetailsGridRow from "./CustomerDetailsGridRow";
import EditCustomer from "./EditCustomerDetails";

const CustomerDetails = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mb-8 px-3 py-2 rounded-md shadow-md bg-white">
      <h1 className="text-lg font-bold tracking-wider text-gray-900 mb-8 px-3">
        <span className="flex justify-between items-center">
          <p>{isEditing ? "Edit your details" : "Your details"} :</p>
          <button
            className={`px-4 py-1 rounded ${
              isEditing
                ? "bg-red-400 hover:bg-red-700"
                : "bg-blue-400 hover:bg-blue-700"
            } text-base transition ease-in-out duration-300 text-white`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {/* add an edit button */}
        </span>
        <span className="w-14 border-2 border-t-3 border-ft block "></span>
      </h1>
      <div className="max-w-xl mx-auto">
        {isEditing ? (
          <EditCustomer />
        ) : (
          <>
            <CustomerDetailsGridRow
              grid1Title="FirstName"
              grid2Title="LastName"
              grid2Value="Boussora"
            />
            <CustomerDetailsGridRow
              grid1Title="Email"
              grid2Title="phone"
              grid2Value="+2153f6987987"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
