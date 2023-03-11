import React from "react";
import AddComment from "./AddComment";

interface User {
  email: string;
  id: string;
  comments: object;
}
function CommentSection({ id, email, comments }: User) {
  console.log(comments);
  return (
    <div>
      <AddComment comments={comments} email={email} id={id}></AddComment>
    </div>
  );
}

export default CommentSection;
