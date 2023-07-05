import React, { useEffect, useState } from "react";
import Image from "next/image";
import SVGstyle from "@/public/images/points.svg";
import { BillingConfigurationCustomer } from "lago-javascript-client";
import axios from "axios";
import { countReset } from "console";
import { SourceTextModule } from "vm";

const cust = {
  externalId: "1234-5678-9098-7654-3210",
  addressLine1: "5230 Penfield Ave",
  city: "Woodland Hills",
  currency: "EUR",
  country: "US",
  email: "test@example.com",
  legalName: "Coleman-Blair",
  name: "Test Name",
  phone: "1-171-883-3711 x245",
  billingConfiguration: {
    paymentProvider:
      "stripe" as BillingConfigurationCustomer["paymentProvider"],
    sync: true,
    syncWithProvider: true,
  },
  metadata: [
    {
      lagoId: "1234",
      key: "foo",
      value: "bar",
      displayInInvoice: true,
    },
  ],
};

type Customer = {
  externalId: string;
  addressLine1: string;
  country: string;
  email: string;
  name: string;
  phone: string;
  currency: string;
};

const INITIAL_CUSTOMER = {
  externalId: "prj_kljnlrthiufd6g541dfs5hb",
  addressLine1: "",
  country: "",
  currency: "",
  name: "",
  email: "",
  phone: "",
};

const API_URL = "http://localhost:3000/api";
const CreateCustomer = () => {
  const [currencies, setCurrencies] = useState<string[]>();
  const [countries, setCountries] = useState<any>();

  const [customer, setCustomer] = useState<Customer>(INITIAL_CUSTOMER);

  useEffect(() => {
    //
    // Fetch currencies
    async function fetch() {
      try {
        const response1 = await axios.get(API_URL + "/currencies");
        setCurrencies(Object.keys(response1.data));

        const response2 = await axios.get(API_URL + "/countries");
        setCountries(response2.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  const handleChange = (e: any) => {
    //function to handleChange:
    const { name, value } = e.target;
    if (name && value)
      setCustomer((prev) => ({
        ...prev,
        [name]: value,
      }));
    console.log(customer);
  };

  const handleSubmit = () => {
    //
    const { externalId, addressLine1, country, currency, name, email, phone } =
      customer;

    console.log(
      externalId,
      addressLine1,
      country,
      currency,
      name,
      email,
      phone
    );

    if (
      externalId != "" &&
      addressLine1?.length > 3 &&
      country != "" &&
      currency != "" &&
      name != "" &&
      email != "" &&
      phone != ""
    ) {
      console.log("submit");
    } else {
      console.log("error");
    }
  };

  return (
    <div className="bg-white relative">
      <div
        className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row"
      >
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <Image
                src="/images/side-img.png"
                className="btn-"
                alt="image"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-6/12">
            <div
              className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10"
            >
              <p className="w-full text-2xl font-medium text-center leading-snug font-serif">
                Sign up for an account
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-5">
                <div className="relative">
                  <p
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
                  >
                    Name
                  </p>
                  <input
                    placeholder="John Wek"
                    type="text"
                    name="name"
                    className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-3 pr-3 pb-3 pl-3 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Email
                  </p>
                  <input
                    placeholder="example@ex.com"
                    type="text"
                    name="email"
                    className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full p-3 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <p
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
                  >
                    Phone
                  </p>
                  <input
                    placeholder="+33 6646 54654"
                    type="text"
                    name="phone"
                    className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full p-3 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <div className="relative flex gap-8">
                    <div className="relative  w-full">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                        Country
                      </p>
                      <select
                        className="border w-full placeholder-gray-400 focus:outline-none focus:border-black p-3 mt-2 mr-0 mb-0 ml-0 text-base block bg-white  border-gray-300 rounded-md"
                        name="country"
                        onChange={handleChange}
                      >
                        {countries &&
                          Object.keys(countries).map((key, index) => (
                            <option value={countries[key]} key={key}>
                              {key}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="relative  w-full">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                        Currency
                      </p>
                      <select
                        className=" border w-full placeholder-gray-400 focus:outline-none focus:border-black p-3 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md "
                        name="currency"
                        onChange={handleChange}
                      >
                        {currencies &&
                          currencies.map((curr) => (
                            <option value={curr} key={curr}>
                              {curr}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <p
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
                  >
                    Address
                  </p>
                  <input
                    placeholder="Av hello 1 world"
                    type="text"
                    name="addressLine1"
                    className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-3 pr-3 pb-3 pl-3 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <a
                    className="w-full inline-block pr-4 py-3 cursor-pointer pl-4 text-xl font-medium text-center text-white bg-ft
                  rounded-lg transition duration-200 hover:bg-gray-900 ease"
                    onClick={handleSubmit}
                  >
                    Submit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
