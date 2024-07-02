import React from "react";
import Posts from "../components/posts/Posts";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [savedIDs, setSavedIDs] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post/")
      .then((response) => {
        setPosts(response.data.reverse());
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });

    const userID = localStorage.getItem("userID");
    if (userID) {
      // Fetch Saved
      axios
        .get(`http://localhost:3000/post/saved/ids/${userID}`, {
          headers: { Authorization: cookies.access_token },
        })
        .then((response) => {
          // console.log(response.data.saved);
          setSavedIDs(response.data.saved);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    } else {
      setSavedIDs([]);
    }
  }, []);

  if (error) {
    return (
      <center>
        <h2 style={{ color: "#ed4f4f" }}>Error: {error.message}</h2>
      </center>
    );
  }

  if (posts && savedIDs) {
    return <Posts data={posts} saved={savedIDs} />;
  } else {
    return (
      <center>
        <h2>Loading...</h2>
      </center>
    );
  }
};

export default Home;
