import { ChangeEvent, FormEvent, useState } from "react";
import { MdOutlineLockReset } from "react-icons/md";
import { useResetPasswordMutation } from "../RTK/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface FetchErrorData {
  error: string;
}

const isFetchErrorData = (data: unknown): data is FetchErrorData => {
  return (data as FetchErrorData).error !== undefined;
};

const Reset = () => {
  const navigate = useNavigate();

  interface ResetParams {
    token: string | undefined;
    [key: string]: string | undefined;
  }

  const { token } = useParams<ResetParams>();

  interface Reset {
    token: string;
    password: string;
    confirmPassword: string;
  }

  const [reset, setReset] = useState<Reset>({
    token: token || "",
    password: "",
    confirmPassword: "",
  });

  // reset.token =

  const dataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReset({ ...reset, [e.target.name]: e.target.value });
  };

  const [resetPassword] = useResetPasswordMutation();

  const resetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await resetPassword(reset);

    if ("error" in result) {
      const fetchError = result.error as FetchBaseQueryError;
      if (fetchError.data && isFetchErrorData(fetchError.data)) {
        return toast.error(fetchError.data.error);
      } else {
        return toast.error("An unexpected error occurred.");
      }
    }

    if (result.data.success) {
      toast.success(`Password reset succeffuly`);
      setTimeout(() => {
        toast.success(`${result.data.user.name} logged in successfully`);
      }, 2000);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h2>Reset Current Password</h2>
        <div className="vitLogo">
          <MdOutlineLockReset />
        </div>
        <form onSubmit={resetSubmit}>
          <input
            required
            type="password"
            placeholder="New Password"
            value={reset.password}
            name="password"
            onChange={dataChange}
          />
          <input
            required
            type="password"
            placeholder="Confirm Password"
            value={reset.confirmPassword}
            name="confirmPassword"
            onChange={dataChange}
          />
          <input type="submit" value="Reset Password" />
        </form>
      </div>
    </div>
  );
};

export default Reset;
