import {
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useState } from "react";

const user = { _id: "asdf", role: "admin" };

const Navbar = () => {
  const [cartActive, setCartActive] = useState<boolean>(false);
  const handleLogOut = () => {};

  const handleCart = () => {
    setCartActive((prev) => !prev);
  };

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
          <Link to={"./category/food"}>Food</Link>
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
          <Link to={"./category/tech"}>Tech</Link>
          <div className="dropContainer">
            <div className="dropList">
              <ul>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>Food</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>Pani</b> - dekho ye dil kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>Falana</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>Dhimka</b> - dekho ye dil{" "}
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>HOME</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>HOME</b> - dekho ka haal kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>HOME</b> - dekho ye dil haal kya
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>HOME</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>Food</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>Pani</b> - dekho ye dil kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>HOME</b> - dekho ka haal kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>Dhimka</b> - dekho ye dil{" "}
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>Falana</b> - dekho ye dil ka haal kya
                  </Link>
                </li>
                <li>
                  <Link to={"#"} className="udlLeft">
                    <b>HOME</b> - dekho ye dil haal kya
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <Link to={"./category/shoes"}>Shoes</Link>
          <div className="dropContainer">Oops Sold Out!</div>
        </div>
      </div>
      <div className="navRight">
        {user?._id ? (
          <>
            {/* <Link to={"/cart"}><FaShoppingBag /></Link> */}
            <button onClick={handleCart}>
              <FaShoppingBag />
            </button>
            <div className="cartNavContainer">
              <Cart cartActive={cartActive} setCartActive={setCartActive} />
            </div>
            <div className="container">
              <button>
                <FaUser />
              </button>
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
