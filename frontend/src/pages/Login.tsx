import { FormEvent, useState } from "react";
import { useLoginUserMutation } from "../RTK/UserApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginUser] = useLoginUserMutation();

  const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await loginUser({ email, password });
    if (result.error) {
      const fetchError = result.error as FetchBaseQueryError;
      if (fetchError.data as { error: string })
        return toast.error((fetchError.data as { error: string }).error);
    }
    if (result.data.success === true) {
      toast.success(`Loged In ${result.data.user.name} successfully`);
      navigate("/");
    }
  };



  return (
    <div className="loginContainer">
      <div className="loginBox">
        <form className="loginForm" onSubmit={loginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value={"Login"} />
        </form>
      </div>
    </div>
  );
};

export default Login;
