import { FaRegEdit, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useLogoutUserMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "../RTK/UserApi";
import useAuthGuard from "../tools/AuthGuard";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Loader from "../components/Loader";

type navProps = {
  user: {
    _id: string;
    name: string;
    email: string;
    avatar: {
      public_id: string;
      url: string;
    };
    role: string;
    __v: number;
  };
};

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface pswrdType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserProfile = ({ user }: navProps) => {
  useEffect(() => {
    const pswrdBox = document.querySelector(
      ".passwordBox"
    ) as HTMLDialogElement;

    if (pswrdBox) {
      pswrdBox.addEventListener("click", (e) => {
        const pswrdBoxDimensions = pswrdBox.getBoundingClientRect();
        if (
          e.clientX < pswrdBoxDimensions.left ||
          e.clientX > pswrdBoxDimensions.right ||
          e.clientY < pswrdBoxDimensions.top ||
          e.clientY > pswrdBoxDimensions.bottom
        ) {
          pswrdBox.close();
        }
      });
    }

    const proBox = document.querySelector(".proBox") as HTMLDialogElement;

    if (proBox) {
      proBox.addEventListener("click", (e) => {
        const proBoxDimensions = proBox.getBoundingClientRect();
        if (
          e.clientX < proBoxDimensions.left ||
          e.clientX > proBoxDimensions.right ||
          e.clientY < proBoxDimensions.top ||
          e.clientY > proBoxDimensions.bottom
        ) {
          proBox.close();
        }
      });
    }

    // console.log("Called!!");
  }, []);

  const navigate = useNavigate();
  const [logoutUser, { isLoading: loL }] = useLogoutUserMutation();
  const [updateProfile, { isLoading: upL }] = useUpdateProfileMutation();
  const [updatePassword, { isLoading: upsL }] = useUpdatePasswordMutation();

  // using authGuard
  useAuthGuard();

  const [userPro, setUserPro] = useState<UserProfile>({
    name: user.name ?? "",
    email: user.email ?? "",
    avatar: "noImg",
  });

  const dataChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "avatar" && e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserPro({ ...userPro, avatar: reader.result as string });
      };
    } else {
      setUserPro({ ...userPro, [e.target.name]: e.target.value });
    }
  };

  const handleLogOut = async () => {
    try {
      const result = await logoutUser({});
      if (!result.data.success) {
        return toast.error(result.data.error);
      }
      toast.success(result.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(String(error));
    }
  };

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // console.log(userPro);
      const result = await updateProfile(userPro);
      if (!result.data) {
        return toast.error("Unkown error occured");
      }
      if (!result.data.success) {
        return toast.error(result.data.error);
      }
      toast.success(result.data.message);
    } catch (error) {
      toast.error(String(error));
    }
  };

  const showPasswordBox = () => {
    const pswrdBox = document.querySelector(
      ".passwordBox"
    ) as HTMLDialogElement;

    pswrdBox.showModal();
  };

  const showProBox = () => {
    const proBox = document.querySelector(".proBox") as HTMLDialogElement;
    proBox.showModal();
  };

  const [pswrd, setPswrd] = useState<pswrdType>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const pswrdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPswrd({ ...pswrd, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await updatePassword(pswrd);

      if (result.error) {
        const fetchError = result.error as FetchBaseQueryError;
        if (fetchError.data as { error: string })
          return toast.error((fetchError.data as { error: string }).error);
      }
      toast.success(result.data.message);
    } catch (error) {
      toast.error(String(error));
    }
  };

  if (upL || upsL || loL) return <Loader />;

  return (
    <div className="meContainer">
      <nav className="meNav">
        <div>
          <Link to="/" className="logo">
            <span className="V">V</span>
            <span className="X">X</span>
          </Link>
          <Link to="/" className="logoTxt">
            VIT
          </Link>
          <Link to="/" className="X">
            X
          </Link>
          <Link to="/" className="logoTxt">
            change
          </Link>
        </div>
        <div>
          <h2>User Profile</h2>

          <div className="container">
            <Link to={"/me"}>
              <img src={user.avatar.url} alt="" />
              {/* <FaUser /> */}
            </Link>
            <div className="dropUser">
              {user.role === "admin" && (
                <Link to={"/admin/dashboard"} className="udlLeft">
                  Dashboard
                </Link>
              )}
              <Link to={"/orders"} className="udlLeft">
                Orders
              </Link>
              <button className="signOut" onClick={handleLogOut}>
                <FaSignOutAlt className="signOutIcon" />
                <span className="signOutTxt">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <aside className="meAside">
          <ul>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
        </aside>
        <div className="meBox">
          <div>
            <div>
              <div className="userImg" onClick={showProBox}>
                <img src={user.avatar.url} alt={userPro.name} />
              </div>
              <div>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    value={userPro.name}
                    placeholder="Enter name"
                    onClick={showProBox}
                    name="name"
                  />
                </div>

                <div>
                  <label htmlFor="name">Email:</label>
                  <input
                    type="text"
                    value={userPro.email}
                    placeholder="Enter email"
                    onClick={showProBox}
                    name="email"
                  />
                </div>

                <div>
                  <button type="button" onClick={showPasswordBox}>
                    Change Password
                  </button>
                  <button type="submit" onClick={showProBox}>
                    Update Profile
                  </button>

                  <dialog className="imgBox">
                    <img src={userPro.avatar} alt={userPro.name} />
                    <button>
                      <FaRegEdit />
                    </button>
                  </dialog>

                  <dialog className="passwordBox">
                    <h2>Set New Password</h2>
                    <form method="dialog" onSubmit={handleChangePassword}>
                      <input
                        type="text"
                        required
                        value={pswrd.oldPassword}
                        onChange={pswrdChange}
                        placeholder="Enter your Current Password"
                        autoComplete="password"
                        name="oldPassword"
                      />
                      <input
                        type="password"
                        required
                        value={pswrd.newPassword}
                        onChange={pswrdChange}
                        placeholder="Set New Current Password"
                        autoComplete="new-password"
                        name="newPassword"
                      />
                      <input
                        type="password"
                        required
                        value={pswrd.confirmPassword}
                        onChange={pswrdChange}
                        placeholder="Confirm New Password"
                        name="confirmPassword"
                      />
                      <input type="submit" value={"Submit"} />
                    </form>
                  </dialog>
                  <dialog className="proBox">
                    <h2>Update Profile</h2>
                    <form method="dialog" onSubmit={handleUpdateProfile}>
                      <div className="file-input-container">
                        <img
                          src={
                            userPro.avatar === "noImg"
                              ? user.avatar.url
                              : userPro.avatar
                          }
                          alt={userPro.name}
                        />
                        <input
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept="image/*"
                          onChange={dataChange}
                        />
                        <label htmlFor="avatar" className="file-input-label">
                          <FaRegEdit />
                        </label>
                      </div>
                      <input
                        type="text"
                        required
                        value={userPro.name}
                        onChange={dataChange}
                        placeholder="Enter name"
                        name="name"
                      />
                      <input
                        type="email"
                        required
                        value={userPro.email}
                        onChange={dataChange}
                        placeholder="Enter email"
                        name="email"
                      />
                      <input type="submit" value={"Update Profile"} />
                    </form>
                  </dialog>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h2>My account</h2>
                <Link to={"/admin/dashboard"}>My Dashboard</Link>
                <Link to={"/orders"}>My Orders</Link>
              </div>
              <div>
                <h2>My Top Sells</h2>
                <Link to={"/cycle"}>Cycle</Link>
                <Link to={"/slipper"}>Slipper</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
