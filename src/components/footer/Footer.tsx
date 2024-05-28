import { Fragment } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      <div className="footContainer">
        <div className="footLeft ">
          <div className="vitLogo">
            <Link to="/" className="logoVit">
              <span className="Vbig">V</span>
              <span className="Xbig">X</span>
            </Link>
          </div>
          <div>
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
        </div>
        <div className="footCenter">
          <div className="footList">
            <h1>Top Categories</h1>
            <ul>
              <li>
                <Link to={"#"}>Bicycle</Link>
              </li>
              <li>
                <Link to={"#"}>Mobiles</Link>
              </li>
              <li>
                <Link to={"#"}>Bicycle</Link>
              </li>
              <li>
                <Link to={"#"}>Bicycle</Link>
              </li>
            </ul>
          </div>
          <div className="footList">
            <h1>Top Links</h1>
            <ul>
              <li>
                <Link to={"#"}>Bicycle</Link>
              </li>
              <li>
                <Link to={"#"}>Mobiles</Link>
              </li>
              <li>
                <Link to={"#"}>Bicycle</Link>
              </li>
              <li>
                <Link to={"#"}>Bicycle</Link>
              </li>
            </ul>
          </div>
          <div className="footList">
            <h1>Policies</h1>
            <ul>
              <li>
                <Link to={"#"}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={"#"}>Terms & Conditions</Link>
              </li>
              <li>
                <Link to={"#"}>Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footRight">
          <h1>Meet the Team</h1>
          <ul>
            <li>
              <Link to={"#"}>Divy</Link>
              <Link to={"#"}>
                <FaInstagram />
              </Link>
              <Link to={"#"}>
                <FaLinkedin />
              </Link>
              <Link to={"#"}>
                <FaGithub />
              </Link>
            </li>
            <li>
              <Link to={"#"}>Tanmay</Link>
              <Link to={"#"}>
                <FaInstagram />
              </Link>
              <Link to={"#"}>
                <FaLinkedin />
              </Link>
              <Link to={"#"}>
                <FaGithub />
              </Link>
            </li>
            <li>
              <Link to={"#"}>Devansh</Link>
              <Link to={"#"}>
                <FaInstagram />
              </Link>
              <Link to={"#"}>
                <FaLinkedin />
              </Link>
              <Link to={"#"}>
                <FaGithub />
              </Link>
            </li>
            <li>
              <Link to={"#"}>Yuvraj</Link>
              <Link to={"#"}>
                <FaInstagram />
              </Link>
              <Link to={"#"}>
                <FaLinkedin />
              </Link>
              <Link to={"#"}>
                <FaGithub />
              </Link>
            </li>
            <li>
              <Link to={"#"}>Madhuram</Link>
              <Link to={"#"}>
                <FaInstagram />
              </Link>
              <Link to={"#"}>
                <FaLinkedin />
              </Link>
              <Link to={"#"}>
                <FaGithub />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
