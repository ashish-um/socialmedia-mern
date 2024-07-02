import React, { Fragment } from "react";
import Post from "../post_card/Post";

const Posts = ({ data, saved }) => {
  if (data) {
    return (
      <>
        {data.map((post) => {
          return (
            <Fragment key={post._id}>
              <Post
                post={post}
                liked={post.liked?.includes(localStorage.getItem("userID"))}
                saved={saved?.includes(post._id)}
              />
            </Fragment>
          );
        })}
      </>
    );
  }
};

export default Posts;
