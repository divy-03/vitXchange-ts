import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../RTK/UserApi";
import useAuthGuard from "../tools/AuthGuard";

type navProps = {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    __v: number;
  };
};

const UserProfile = ({ user }: navProps) => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  // using authGuard
  useAuthGuard();

  const handleLogOut = async () => {
    try {
      const result = await logoutUser({});
      if (result.error) {
        const fetchError = result.error as FetchBaseQueryError;
        if (fetchError.data as { error: string })
          return toast.error((fetchError.data as { error: string }).error);
      }
      if (result.data.success === true) {
        toast.success(result.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(String(error));
    }
  };
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
              <FaUser />
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
              <div className="vitLogo">
                <FaUser />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
