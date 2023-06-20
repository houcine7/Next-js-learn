import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => {
  return (
    <div className=" max-w-xl items-center space-x-2 mx-auto flex flex-col justify-center h-full">
      <p className="text-center mb-4 text-lg font-bold text-purple-800">
        Welcome To our platform
      </p>
      <form className="w-full">
        <div className="mb-2">
          <label htmlFor="firstName" className="font-bold">
            FirstName
          </label>
          <Input
            type="text"
            placeholder="Frist name"
            id="firstName"
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="font-bold">
            LastName
          </label>
          <Input
            type="text"
            placeholder="Last Name"
            id="lastName"
            className="w-full"
          />
        </div>
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

export default Register;
