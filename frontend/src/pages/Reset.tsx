import { MdOutlineLockReset } from "react-icons/md";

const Reset = () => {
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h2>Reset Current Password</h2>
        <div className="vitLogo">
          <MdOutlineLockReset />
        </div>
        <form>
          <input type="password" placeholder="New Password"/>
          <input type="password" placeholder="Confirm Password"/>
          <input type="submit" value="Reset Password" />
        </form>
      </div>
    </div>
  );
};

export default Reset;
