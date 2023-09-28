/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import "./welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcomePage">
      <div className="heading">Welcome to the page..!</div>
      <nav>
        <Link to={"/login"}>Login</Link>
      </nav>
    </div>
  );
};

export default Welcome;
