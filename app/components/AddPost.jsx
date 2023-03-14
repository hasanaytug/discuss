"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function AddPost({ email, session }) {
  const Router = useRouter();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const handleAdd = async () => {
    setPosting(true);
    const res = await axios.post(
      "https://discuss-taupe.vercel.app/api/create-post",
      {
        text,
        email,
      }
    );
    Router.refresh();
    setPosting(false);
    setText("");
  };
  return (
    <div className="flex flex-col items-center">
      <textarea
        value={text.length < 200 ? text : text.slice(0, 199)}
        placeholder={session ? "Share your thoughts" : "Please Sign In to post"}
        onChange={(e) => setText(e.target.value)}
        className={`${
          !session ? "divide-solid" : null
        } w-full mt-10  h-32 mx-h-32 bg-gray-200 focus:outline-none p-4 resize-none overflow-hidden rounded`}
        disabled={session ? false : true}
      ></textarea>
      {session ? (
        <div className="flex w-full justify-between items-center">
          <p
            className={`${
              text.length > 200 ? `text-red-600` : `text-white`
            } text-sm`}
          >{`${text.length}/200`}</p>
          <button
            onClick={handleAdd}
            disabled={posting ? true : false}
            className={`bg-blue-300 ${
              posting ? null : "hover:bg-blue-500"
            } p-2 rounded m-2 text-sm ${posting ? "disabled:opacity-75" : ""}`}
          >
            {posting ? "Posting..." : "Post"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default AddPost;
