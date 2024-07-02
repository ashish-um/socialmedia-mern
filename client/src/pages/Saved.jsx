import React from "react";
import Posts from "../components/posts/Posts";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Saved() {
  const [posts, setPosts] = useState(null);
  const [savedIDs, setSavedIDs] = useState(null);
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/post/saved/${localStorage.getItem("userID")}`,
        { headers: { Authorization: cookies.access_token } }
      )
      .then((response) => {
        setPosts(response.data.saved.reverse());
        console.log(response.data.saved);

        // console.log(response.data);
      })
      .catch((err) => console.error(err));

    const userID = localStorage.getItem("userID");
    if (userID) {
      axios
        .get(`http://localhost:3000/post/saved/ids/${userID}`, {
          headers: { Authorization: cookies.access_token },
        })
        .then((response) => {
          // console.log(response.data.saved);
          setSavedIDs(response.data.saved);
        })
        .catch((err) => console.error(err));
    } else {
      setSavedIDs([]);
    }
  }, []);

  if (posts && savedIDs) {
    if (posts.length) {
      return <Posts data={posts} saved={savedIDs} />;
    } else {
      return (
        <center>
          <h2>No Saved Posts Found 😿</h2>
        </center>
      );
    }
  } else {
    return (
      <center>
        <h2>Loading...</h2>
      </center>
    );
  }
}

export default Saved;
