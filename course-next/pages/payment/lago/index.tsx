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

      const response = await axios.get("/api/lago");
      console.log(response);
      setIsClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addMetric = async () => {
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
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Add metrics
      </button>
    </div>
  );
};

export default Index;
