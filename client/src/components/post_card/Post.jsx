import React, { useEffect, useId, useState } from "react";
import { useCookies } from "react-cookie";
import "./style.css";
import ProfileIcon from "../profile_icon/ProfileIcon";
import LikeSvg from "../../assets/svg/LikeSvg";
import LikeUnfilledSvg from "../../assets/svg/LikeUnfilledSvg";
import UnSavedSvg from "../../assets/svg/UnSavedSvg";
import SavedSvg from "../../assets/svg/SavedSvg";
import axios from "axios";
import Loading from "../loading_bar/Loading";

function Buttons({ userID, postID, defaultSave, defaultLike, initLikeCount }) {
  function createRipple(e, color = "pink") {
    const button = e.target;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.background = color;
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  const [liked, setLiked] = useState(defaultLike ? 1 : 0);
  const [saved, setSaved] = useState(defaultSave ? 1 : 0);
  const [likeCount, setLikeCount] = useState(initLikeCount || 0);
  const [cookies, _] = useCookies(["access_token"]);
  // const [saved, setSaved] = useState(2);

  function pushSaved() {
    setSaved(2); // loading
    axios
      .put(
        "http://localhost:3000/post/",
        { userID, postID },
        { headers: { Authorization: cookies.access_token } }
      )
      .then((res) => {
        setSaved(1);
      });
  }

  function deleteSaved() {
    setSaved(2); // loading
    axios
      .delete(`http://localhost:3000/post/saved/${userID}/${postID}`, {
        headers: { Authorization: cookies.access_token },
      })
      .then((res) => {
        setSaved(0);
      });
  }

  function pushLiked() {
    setLiked(2); // Loading
    axios
      .put(
        "http://localhost:3000/post/liked/",
        { userID, postID },
        { headers: { Authorization: cookies.access_token } }
      )
      .then((res) => {
        setLiked(1);
        setLikeCount((count) => count + 1);
      });
  }

  function deleteLiked() {
    setLiked(2); // Loading
    axios
      .delete(`http://localhost:3000/post/liked/${userID}/${postID}`, {
        headers: { Authorization: cookies.access_token },
      })
      .then((res) => {
        setLiked(0);
        setLikeCount((count) => count - 1);
      });
  }

  return (
    <div className="btn-holder">
      <button
        onClick={(e) => {
          if (liked !== 2) {
            createRipple(e, "pink");
            if (liked === 0) pushLiked();
            if (liked === 1) deleteLiked();
          }
        }}
        className="btn btn-left pointer"
        disabled={liked === 2 || !cookies.access_token}
      >
        {likeCount}
        <div
          style={{ width: "28px", height: "28px", paddingLeft: "10px" }}
          className="noclick"
        >
          {liked === 2 ? (
            <Loading />
          ) : liked === 1 ? (
            <LikeSvg />
          ) : (
            <LikeUnfilledSvg />
          )}
        </div>
      </button>
      <button
        onClick={(e) => {
          if (saved !== 2) {
            createRipple(e, "rgb(117, 236, 115)");
            if (saved === 0) pushSaved();
            if (saved === 1) {
              deleteSaved();
            }
          }
        }}
        className="btn btn-right pointer"
        disabled={saved === 2 || !cookies.access_token}
      >
        <div className="noclick" style={{ width: "28px", height: "28px" }}>
          {saved === 2 ? (
            <Loading />
          ) : saved === 1 ? (
            <SavedSvg />
          ) : (
            <UnSavedSvg />
          )}
        </div>
      </button>
    </div>
  );
}

const Post = ({ post, saved, liked }) => {
  const unavalibleImageUrl =
    "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

  return (
    <div className="card">
      {/* <div>{JSON.stringify(post)}</div> */}
      <div className="card-header">
        <ProfileIcon username={post.author} />
        <div>
          <p>@{post.author}</p>
          <h2>{post.title}</h2>
        </div>
      </div>
      <div
        className="img-holder"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <img
          src={post.image}
          height={"100%"}
          width={"100%"}
          onError={(e) => {
            e.target.src = unavalibleImageUrl;
          }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Buttons
          userID={localStorage.getItem("userID")}
          postID={post._id}
          defaultSave={saved}
          defaultLike={liked}
          initLikeCount={post.liked?.length}
        />
      </div>
    </div>
  );
};

export default Post;
