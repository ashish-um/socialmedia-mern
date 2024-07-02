import React from "react";
import "./style.css";

const ProfileIcon = ({ username }) => {
  const firstLetter = username.slice(0, 1).toUpperCase();
  const backgroundColor = ((firstLetter.charCodeAt(0) - 64) / 26) * 360;

  return (
    <span
      style={{ background: `hsl(${backgroundColor},40%,45%)` }}
      className="profile-icon"
    >
      {firstLetter}
    </span>
  );
};

export default ProfileIcon;
