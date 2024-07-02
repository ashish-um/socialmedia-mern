import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: { type: String, required: true },
  image: { type: String, required: true },
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

// https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)

export const PostModel = mongoose.model("posts", PostSchema);
