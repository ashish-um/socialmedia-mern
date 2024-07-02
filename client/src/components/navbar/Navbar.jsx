import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import ProfileIcon from "../profile_icon/ProfileIcon";
import "./nav.css";
import CreateSvg from "../../assets/svg/CreateSvg";
import LogoutSvg from "../../assets/svg/LogoutSvg";
import SavedSvg from "../../assets/svg/SavedSvg";

function Navbar() {
  const [cookies, _, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const iconSize = 20;

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
                <div className="browser">Create</div>
                <div
                  className="mobile"
                  style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                >
                  <CreateSvg />{" "}
                </div>
              </Link>
              <Link className="nav-element" to={"/saved"}>
                <div className="browser">Saved</div>
                <div
                  className="mobile"
                  style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                >
                  <SavedSvg />
                </div>
              </Link>
              <div className="nav-element" onClick={logOut} to={"/auth"}>
                <div className="browser">Log out</div>
                <div
                  className="mobile"
                  style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                >
                  <LogoutSvg />
                </div>
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
