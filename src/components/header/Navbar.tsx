import { useState } from "react";
import {
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const user = { _id: "asd", role: "admin" };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="navbar">
      <div className="navLeft">
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
      <div className="navCenter">
        <div className="container">
          <Link to={"./category/food"} onClick={() => setIsOpen(false)}>Food</Link>
          <div className="dropContainer">
            <div className="dropList">
              <ul>
                <li>Home</li>
                <li>about</li>
                <li>contact</li>
                <li>iron</li>
                <li>contact</li>
                <li>iron</li>
              </ul>
              <ul>
                <li>Home</li>
                <li>about</li>
                <li>contact</li>
                <li>iron</li>
                <li>Home</li>
                <li>about</li>
                <li>contact</li>
                <li>iron</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <Link to={"./category/tech"} onClick={() => setIsOpen(false)}>Tech</Link>
          <div className="dropContainer">
            <div className="dropList">
              <ul>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>Food</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>Pani</b> - dekho ye dil kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>Falana</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>Dhimka</b> - dekho ye dil{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>HOME</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>HOME</b> - dekho ka haal kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>HOME</b> - dekho ye dil haal kya
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>HOME</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>Food</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>Pani</b> - dekho ye dil kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>HOME</b> - dekho ka haal kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>Dhimka</b> - dekho ye dil{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>Falana</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link
                    to={"#"}
                    className="udlLeft"
                    onClick={() => setIsOpen(false)}
                  >
                    <b>HOME</b> - dekho ye dil haal kya
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <Link to={"./category/shoes"} onClick={() => setIsOpen(false)}>
            Shoes
          </Link>
          <div className="dropContainer">Oops Sold Out!</div>
        </div>
      </div>
      <div className="navRight">
        {user?._id ? (
          <>
            <Link to={"/cart"}>
              <FaShoppingBag />
            </Link>
            <button
              //   onMouseEnter={() => setIsOpen((prev) => !prev)}
              //   onMouseLeave={() => setIsOpen((prev) => !prev)}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <FaUser />
            </button>
            <dialog open={isOpen}>
              <div>
                {user.role === "admin" && (
                  <Link to={"/admin/dashboard"}>Admin</Link>
                )}
                <Link to={"/orders"}>Orders</Link>
                <button>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
