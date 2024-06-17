import { ChangeEvent, FormEvent, useState } from "react";
import { useAddUserMutation } from "../RTK/UserApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

// Define the structure of the user data
interface User {
  name: string;
  email: string;
  password: string;
}

// Define the expected error structure
interface FetchErrorData {
  error: string;
}

// Type guard to check if the data is of type FetchErrorData
const isFetchErrorData = (data: unknown): data is FetchErrorData => {
  return (data as FetchErrorData).error !== undefined;
};

const SignUp = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const [addUser] = useAddUserMutation();

  const registerDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addUser(user);

    if ("error" in result) {
      const fetchError = result.error as FetchBaseQueryError;
      if (fetchError.data && isFetchErrorData(fetchError.data)) {
        toast.error(fetchError.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }

    if (result.data.success === "true") {
      toast.success(`Registered ${user.name} successfully`);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <form className="loginForm" onSubmit={registerSubmit}>
          <input
            type="text"
            placeholder="User"
            name="name"
            value={user.name}
            required
            onChange={registerDataChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            required
            onChange={registerDataChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            required
            onChange={registerDataChange}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
