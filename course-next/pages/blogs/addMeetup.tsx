import NavBar from "@/components/NavBar";
import AddMeetupForm from "@/components/addMeetupForm";
import React, { Fragment } from "react";

const AddMeetup = () => {
  const SubmitHandler = async (data: any) => {
    //
    const response = await fetch("http://localhost:3000/api/addMeetup", {
      method: "POST",

      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <Fragment>
      <AddMeetupForm handelSubmit={SubmitHandler} />
    </Fragment>
  );
};

export default AddMeetup;
