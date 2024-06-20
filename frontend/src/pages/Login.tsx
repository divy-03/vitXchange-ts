import { ChangeEvent, FormEvent, useState } from "react";
import {
  useAddUserMutation,
  useForgotPassswordMutation,
  useLoginUserMutation,
} from "../RTK/UserApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TiUserAddOutline, TiUserOutline } from "react-icons/ti";
import Loader from "../components/Loader";
import { MdOutlineLockReset } from "react-icons/md";
// import Cookies from "js-cookie";

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

const Login = () => {
  const navigate = useNavigate();
  const [pos, setPos] = useState<string>("0vw");
  const [vis, setVis] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginUser, { isLoading: isLl }] = useLoginUserMutation();

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

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const [addUser, { isLoading: isRl }] = useAddUserMutation();

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

    if (result.data.success) {
      toast.success(`Registered ${user.name} successfully`);
      navigate("/");
    }
  };

  const [forgotPassword, { isLoading: isFl }] = useForgotPassswordMutation();

  const sendMail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await forgotPassword({ email });

    if ("error" in result) {
      const fetchError = result.error as FetchBaseQueryError;
      if (fetchError.data && isFetchErrorData(fetchError.data)) {
        toast.error(fetchError.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }

    if (result.data.success) {
      toast.success(result.data.message);
    }
  };

  if (isFl || isLl || isRl) {
    return <Loader />;
  }

  return (
    <div className="loginContainer">
      <div
        style={{
          opacity: `${vis ? "1" : "0"}`,
          visibility: `${vis ? "visible" : "hidden"}`,
          transform: `${vis ? "scale(1)" : "scale(0)"}`,
        }}
      >
        <button onClick={(prev) => setVis(!prev)}>Login</button>
        <div className="vitLogo">
          <MdOutlineLockReset />
        </div>
        <h2>Forgot Your Password</h2>
        <span>Get password reset link on your mail</span>
        <form className="loginForm" onSubmit={sendMail}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="submit" value={"Send Mail"} />
        </form>
      </div>
      <div
        className="loginRegisterContainer"
        style={{
          opacity: `${vis ? "0" : "1"}`,
          visibility: `${vis ? "hidden" : "visible"}`,
          transform: `${vis ? "translateY(-70vh)" : "translateY(0)"}`,
        }}
      >
        <div>
          <button onClick={() => setPos("0vw")}>Login</button>
          <button onClick={() => setPos("calc(-15rem - 10vw)")}>
            Register
          </button>
          <div
            style={{ left: `${pos === "0vw" ? "0" : "calc(5rem + 5vw)"}` }}
          ></div>
        </div>
        <div style={{ left: `${pos}` }}>
          <div className="loginBox">
            <div className="vitLogo">
              <TiUserOutline />
            </div>
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
              <a
                className="udlLeftLight"
                onClick={() => {
                  setVis(true);
                }}
              >
                Forgot Password?
              </a>
              <input type="submit" value={"Login"} />
            </form>
          </div>
          <div className="registerBox">
            <div className="vitLogo">
              <TiUserAddOutline className="userAdd" />
            </div>
            <form className="registerForm" onSubmit={registerSubmit}>
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
      </div>
    </div>
  );
};

export default Login;
