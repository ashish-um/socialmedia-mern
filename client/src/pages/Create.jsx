import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);

  function onSubmit(e) {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const imageURL = e.target.elements.image.value;
    axios
      .post(
        "https://socialmedia-mern-api.vercel.app/post",
        {
          authorID: localStorage.getItem("userID"),
          title,
          image: imageURL,
        },
        { headers: { Authorization: cookies.access_token } }
      )
      .then((res) => {
        alert("Post Successful");
        navigate("/");
      })
      .catch((err) => console.error(err));

    // console.log(e);
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Create Post</h3>
      <div>
        <p>Title:</p>
        <textarea
          type="text"
          name="title"
          placeholder="This is a picture of my cute little dog..."
        />
      </div>
      <div>
        <p>Image Url:{"  "}</p>
        <input type="text" name="image" placeholder="https://www.example.jpg" />
      </div>

      <input className="button" type="submit" value="Post" />
    </form>
  );
}

export default Create;
