import React, { useState } from "react";

import { Client, getLagoError } from "lago-javascript-client";

import fetch from "node-fetch";
import axios from "axios";

const lagoClient = Client("f26062e7-9a0a-4a7b-901f-73f53bc28d64", {
  baseUrl: "https://api-lago.dreeam.io/api/v1",
});

const Index = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handelClick = async () => {
    // create a billable metric with lgo client with some data
    try {
      setIsClicked(true);
      //   const response = await lagoClient.billableMetrics.createBillableMetric({
      //     billable_metric: {
      //       name: "name1",
      //       code: "code1",
      //       aggregation_type: "sum_agg",
      //       field_name: "field_test",
      //       group: {
      //         key: "country",
      //         values: ["france", "italy", "spain"],
      //       },
      //     },
      //   });

      const response = await axios.get("/api/lago");

      // const response2 = await axios.post(
      //   "https://api.getlago.com/v1/billable_metrics",
      //   {
      //     billable_metric: {
      //       name: "test_metric",
      //       code: "test_caller_test",
      //       description: "this is a simple desc for this billable metric",
      //       aggregation_type: "max_agg",
      //       field_name: "storage_used_test",
      //     },
      //   },
      //   {
      //     headers: {
      //       Authorization: "Bearer f26062e7-9a0a-4a7b-901f-73f53bc28d64",
      //     },
      //   }
      // );
      //   const response3 = await axios.post(
      //     "https://api.getlago.com/v1/events",
      //     {
      //       billable_metric: {
      //         name: "test_metric",
      //         code: "test_caller_test",
      //         description: "this is a simple desc for this billable metric",
      //         aggregation_type: "max_agg",
      //         field_name: "storage_used_test",
      //       },
      //     },
      //     {
      //       headers: {
      //         Authorization: "Bearer f26062e7-9a0a-4a7b-901f-73f53bc28d64",
      //       },
      //     }
      //   );

      console.log(response);
      setIsClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl text-center">Payment Page</h1>
      <button
        disabled={isClicked}
        onClick={handelClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create metric
      </button>
    </div>
  );
};

export default Index;
