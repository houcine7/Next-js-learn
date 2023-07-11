import React, { Fragment, useState } from "react";
import CustomSelect from "./CustomSelect";

const EditCustomer = () => {
  const [selectedValue, setSelectValue] = useState<string>("");
  console.log(selectedValue);

  return (
    <Fragment>
      <form action="">
        <div className="sm:grid sm:grid-cols-2 sm:gap-4 ">
          <div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold tracking-tight">Name</label>
              <input
                type="text"
                name="firstName"
                className="bg-gray-100 outline-none border text-gray-900 border-gray-500 focus:border-blue-700 rounded-md h-10 px-4"
                placeholder="First name"
                // onChange={(e) => handelChange(e)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold tracking-tight">Legal name</label>
              <input
                type="text"
                name="lastName"
                className="bg-gray-100 outline-none border text-gray-900 border-gray-500 focus:border-blue-700 rounded-md h-10 px-4"
                placeholder="last name"
                // onChange={(e) => handelChange(e)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold tracking-tight">
                Tax identification number
              </label>
              <input
                type="text"
                name="lastName"
                className="bg-gray-100 outline-none border text-gray-900 border-gray-500 focus:border-blue-700 rounded-md h-10 px-4"
                placeholder="last name"
                // onChange={(e) => handelChange(e)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold tracking-tight">Address</label>
              <input
                type="text"
                name="lastName"
                className="bg-gray-100 outline-none border text-gray-900 border-gray-500 focus:border-blue-700 rounded-md h-10 px-4"
                placeholder="last name"
                // onChange={(e) => handelChange(e)}
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold tracking-tight">Country</label>
              <CustomSelect
                optionsList={[
                  "USA",
                  "Canada",
                  "Mexico",
                  "china",
                  "japan",
                  "india",
                  "morroco",
                  "egypt",
                  "sudan",
                ]}
                setSelectValue={setSelectValue}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold tracking-tight">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="bg-gray-100 outline-none border text-gray-900 border-gray-500 focus:border-blue-700 rounded-md h-10 px-4"
                placeholder="phone number"
                // onChange={(e) => handelChange(e)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="font-semibold tracking-tight">Email</label>
              <input
                type="text"
                name="email"
                className="bg-gray-100 outline-none border text-gray-900 border-gray-500 focus:border-blue-700 rounded-md h-10 px-4"
                placeholder="Email"
                // onChange={(e) => handelChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <button className="rounded-md px-3 text-sm font-bold text-white transition-all duration-300 hover:bg-gray-900 py-2 bg-ft">
            Save details
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default EditCustomer;
