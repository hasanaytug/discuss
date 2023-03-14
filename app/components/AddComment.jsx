"use client";

import React, { useState } from "react";
import Comments from "./Comments";
import axios from "axios";
import { useRouter } from "next/navigation";

function AddComment({ email, id, comments }) {
  const Router = useRouter();
  const [text, setText] = useState("");
  const [newComments, setNewComments] = useState(comments);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);
    const res = await axios.post(
      "https://discuss-taupe.vercel.app/api/create-comment",
      {
        text,
        email,
        postId: id,
      }
    );
    const { data } = await axios.get(
      "https://discuss-taupe.vercel.app/api/fetch-comments"
    );
    setNewComments(data);
    setIsLoading(false);
    setText("");
  };
  return (
    <div>
      <div className="flex items-end justify-start mt-6 mb-4 ">
        <textarea
          value={text.length < 200 ? text : text.slice(0, 199)}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your comment"
          className="w-full h-full bg-gray-100 focus:outline-none p-4 resize-none overflow-hidden rounded"
        />
        <div className="flex w-full items-center">
          <button
            onClick={handleAdd}
            disabled={isLoading ? true : false}
            className="bg-blue-300 p-1 rounded m-2 text-sm hover:bg-blue-500"
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
