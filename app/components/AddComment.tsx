"use client";

import React, { useState } from "react";
import Comments from "./Comments";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  id: string;
  comments: object;
}

function AddComment({ email, id, comments }: User) {
  const Router = useRouter();
  const [text, setText] = useState("");
  const [newComments, setNewComments] = useState(comments);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);
    const res = await axios.post("http://localhost:3000/api/create-comment", {
      text,
      email,
      postId: id,
    });
    const { data } = await axios.get(
      "http://localhost:3000/api/fetch-comments"
    );
    setNewComments(data);
    setIsLoading(false);
  };
  return (
    <div>
      <div className="flex items-center mt-6 ">
        <input
          value={text.length < 200 ? text : text.slice(0, 199)}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your comment"
          className="w-full h-8 bg-gray-100 focus:outline-none p-4 resize-none overflow-hidden rounded"
        />
        <div className="flex w-full justify-end items-center">
          <button
            onClick={handleAdd}
            className="bg-blue-300 p-1 rounded m-2 w-full text-sm"
          >
            {isLoading ? "Loading..." : "Comment"}
          </button>
        </div>
      </div>
      <Comments
        newComments={newComments}
        comments={comments}
        id={id}
      ></Comments>
    </div>
  );
}

export default AddComment;
