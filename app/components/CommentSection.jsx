import React from "react";
import AddComment from "./AddComment";

function CommentSection({ id, email, comments }) {
  console.log(comments);
  return (
    <div>
      <AddComment comments={comments} email={email} id={id}></AddComment>
    </div>
  );
}

export default CommentSection;
