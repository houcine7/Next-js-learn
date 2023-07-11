import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import CustomSelect from "./CustomSelect";

type MeetupFormProps = {
  handelSubmit: (data: any) => void;
};

class FormState {
  constructor(
    title: string,
    description: string,
    image: string,
    address: string
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.address = address;
  }

  title: string;
  description: string;
  image: string;
  address: string;
}

const AddMeetupForm = (props: MeetupFormProps) => {
  const [formStates, setFormStates] = useState(new FormState("", "", "", ""));

  const handelChange = (e: ChangeEvent) => {
    //
    setFormStates((prevState: FormState) => {
      const target = e?.target as HTMLInputElement;
      return {
        ...prevState,
        [target?.name]: target?.value,
      };
    });

    //
    //console.log(formStates);
  };

  return (
    <div className="max-w-3xl mx-auto text-gray-900 mt-10">
      <form className="w-full px-4">
        <div className="mb-2">
          <label htmlFor="title">title</label>
          <input
            id="title"
            name="title"
            className="w-full rounded-lg outline-none h-12 px-2 focus:border-blue-400 focus:border-2"
            type="text"
            onChange={(e) => handelChange(e)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            name="image"
            className="w-full rounded-lg outline-none h-12 px-2 focus:border-blue-400 focus:border-2"
            type="text"
            onChange={(e) => handelChange(e)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="address">address</label>
          <input
            id="address"
            name="address"
            className="w-full rounded-lg outline-none h-12 px-2 focus:border-blue-400 focus:border-2"
            type="text"
            onChange={(e) => handelChange(e)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description">description</label>
          <textarea
            id="description"
            name="description"
            onChange={(e) => handelChange(e)}
            className="w-full rounded-lg outline-none h-12 px-2 focus:border-blue-400 focus:border-2"
          />
        </div>

        <button
          className="rounded-md px-2 py-2 bg-blue-700 font-bold  mt-2 float-right"
          onClick={async () => {
            props.handelSubmit({
              title: formStates.title,
              description: formStates.description,
              image: formStates.image,
              address: formStates.address,
            });
          }}
          type="button"
        >
          Save meetup
        </button>
      </form>
    </div>
  );
};

export default AddMeetupForm;
