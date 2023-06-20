"use client";

import * as React from "react";

export const Button = ({ btnText }: { btnText: string }) => {
  return (
    <button
      style={{
        borderRadius: "4px",
        padding: "0.5rem 1rem",
        backgroundColor: "violet",
        border: "1px solid gray",
        cursor: "pointer",
      }}
      onClick={() => alert("Hello world this is the basic app with monorepo")}
    >
      {btnText}
    </button>
  );
};
