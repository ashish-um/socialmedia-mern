import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import ProfileIcon from "../profile_icon/ProfileIcon";
import "./nav.css";

function Navbar() {
  const [cookies, _, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logOut = () => {
    const res = confirm("This will log you out!");
    if (!res) {
      return;
    }
    removeCookie(["access_token"], { path: "/" });
    localStorage.removeItem("userID");
    localStorage.removeItem("username");

    navigate("/auth");
  };

  return (
    <>
      <div className="navbar">
        <Link className="nav-element" to={"/"}>
          Home
        </Link>
        <div style={{ display: "flex", gap: "10px" }}>
          {cookies.access_token ? (
            <>
              <Link className="nav-element" to={"/create"}>
                Create
              </Link>
              <Link className="nav-element" to={"/saved"}>
                Saved
              </Link>
              <div className="nav-element" onClick={logOut} to={"/auth"}>
                Log out
              </div>
              <ProfileIcon username={localStorage.getItem("username")} />
            </>
          ) : (
            <Link className="nav-element" to={"/auth"}>
              Login
            </Link>
          )}
        </div>
      </div>
      <div style={{ height: "80px" }}></div>
    </>
  );
}

export default Navbar;
