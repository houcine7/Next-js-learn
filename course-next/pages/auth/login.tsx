import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Login = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  return (
    <div className=" max-w-xl items-center space-x-2 mx-auto flex flex-col justify-center h-full">
      <form className="w-full">
        <div className="mb-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <Input
            type="email"
            placeholder="example@abc.com"
            id="email"
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <Input
            type="password"
            placeholder="********"
            id="password"
            className="w-full"
          />
        </div>

        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
};

export default Login;
