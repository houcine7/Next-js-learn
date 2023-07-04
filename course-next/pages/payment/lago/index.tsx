import React, { useState } from "react";
import axios from "axios";

const Index = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handelClick = async (): Promise<void> => {
    // create a billable metric with lgo client with some data
    try {
      setIsClicked(true);

      const response = await axios.get("/api/lago");
      console.log(response);
      setIsClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addMetric = async (): Promise<void> => {
    //
    try {
      const response = await axios.post("/api/lago", {
        billableMetrics: {
          billable_metric: {
            name: "test_metric_ft",
            code: "test_caller_test_ft",
            description: "this is a simple desc for this billable metric",
            aggregation_type: "max_agg",
            field_name: "storage_used_test",
          },
        },
      });

      console.log(response);
      //
    } catch (error) {
      console.log(error);
    }
  };

  async function createPlan(): Promise<void> {
    try {
      const response = await axios.post(
        "/api/lago/plans",

        {
          plan: {
            name: "pro-plan-ft-test2",
            code: "pro-plan-ft-test2",
            interval: "monthly",
            description: "This is a the pro plan description",
            amount_cents: 20000,
            amount_currency: "EUR",
            pay_in_advance: true,
            bill_charges_monthly: true,
            charges: [
              {
                billable_metric_id: "8945fe25-47c2-4f49-a1b0-c22e5d6cd30c",
                charge_model: "standard",
              },
            ],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function createCustomer(): Promise<void> {
    try {
      const response = await axios.post("/api/lago/customers", {
        customer: {
          customer: {
            external_id: "cus_13NkmmmmM44",
            address_line1: "Av Allal Al Farissi",
            address_line2: "",
            city: "France",
            country: "FR",
            currency: "EUR",
            email: "houssainadl123@gmail.com",
            legal_name: "houcine ejkk",
            logo_url: "http://hooli.com/logo.png",
            name: "houcine el addali",
            phone: "+212654988755",
            timezone: "Europe/Paris",
            url: "http://hooli.com",
            billing_configuration: {
              invoice_grace_period: 3,
              payment_provider: "stripe",
              sync: true,
              sync_with_provider: true,
              document_locale: "fr",
              vat_rate: 12.5,
            },
            metadata: [
              {
                key: "Name",
                value: "John",
                display_in_invoice: true,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function createSubscription(): Promise<void> {
    try {
      const response = await axios.post("/api/lago/subscriptions", {
        subscription: {
          subscription: {
            external_customer_id: "cus_13Nkdbjf77",
            plan_code: "pro-plan-ft-test",
            external_id: "subscription_Lmfkjnfdjffeiu",
            name: "pro plan ",
            subscription_at: "2023-07-04T00:00:00Z",
            billing_time: "anniversary",
          },
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl text-center">Payment Page</h1>
      <button
        disabled={isClicked}
        onClick={handelClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        get metrics
      </button>

      {/* create a button with a yellow color should be nice button with good hover effect */}
      <button
        onClick={addMetric}
        disabled={true}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Add metrics
      </button>

      <button
        onClick={createPlan}
        disabled={true}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        create plan
      </button>

      <button
        onClick={createCustomer}
        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
      >
        create customer
      </button>

      <button
        onClick={createSubscription}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        create subscription for a customer
      </button>
    </div>
  );
};

export default Index;
