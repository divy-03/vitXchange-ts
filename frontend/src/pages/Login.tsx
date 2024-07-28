import { ChangeEvent, FormEvent, useState } from "react";
import {
  useAddUserMutation,
  useForgotPassswordMutation,
  useLoginUserMutation,
} from "../RTK/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TiUserAddOutline, TiUserOutline } from "react-icons/ti";
import Loader from "../components/Loader";
import { MdOutlineLockReset } from "react-icons/md";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Define the structure of the user data
interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

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
    toast.success(`Loged In ${result.data.user.name} successfully`);
    navigate("/");
  };

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [addUser, { isLoading: isRl }] = useAddUserMutation();

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      const reader = new FileReader();
  
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
  
      reader.onerror = (e) => {
        reject(e);
      };
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
  
        // Set the canvas dimensions to the desired size
        const width = 350;
        const scale = width / img.width;
        canvas.width = width;
        canvas.height = img.height * scale;
  
        // Draw the image on the canvas with the new dimensions
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        // Convert the canvas back to a base64 data URL
        const base64 = canvas.toDataURL(file.type, 0.8);
        resolve(base64);
      };
  
      reader.readAsDataURL(file);
    });
  };
  
  const registerDataChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "avatar" && e.target.files) {
      const file = e.target.files[0];
      try {
        const resizedImage = await resizeImage(file);
        setUser({ ...user, avatar: resizedImage });
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  

  const registerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addUser(user);
    console.log(user);

    if (result.error) {
      const fetchError = result.error as FetchBaseQueryError;
      if (fetchError.data as { error: string })
        return toast.error((fetchError.data as { error: string }).error);
    }

    toast.success(`Registered ${user.name} successfully`);
    navigate("/");
  };

  const [forgotPassword, { isLoading: isFl }] = useForgotPassswordMutation();

  const sendMail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await forgotPassword({ email });

    if (result.error) {
      const fetchError = result.error as FetchBaseQueryError;
      if (fetchError.data as { error: string })
        return toast.error((fetchError.data as { error: string }).error);
    }
    toast.success(result.data.message);
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
                placeholder="Name"
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
              <input
                type="file"
                name="avatar"
                accept="image/*"
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
