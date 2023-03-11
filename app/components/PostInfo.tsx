"use client";
import { useState } from "react";
import CommentSection from "./CommentSection";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  user: object;
  session: object;
}

function PostInfo({ id, user, session }: Post) {
  const Router = useRouter();
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [comments, setComments] = useState({});

  const handleComments = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "http://localhost:3000/api/fetch-comments"
    );
    setComments(data);
    setShowComments(!showComments);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await axios.delete("http://localhost:3000/api/delete-post", {
      data: {
        id,
      },
    });
    setIsDeleting(false);
    Router.refresh();
  };
  return (
    <div className="mt-1">
      <div className="flex justify-between">
        <div>
          {session && (
            <button
              className={`${
                isLoading ? "bg-blue-200 disabled opacity-75" : "bg-blue-200"
              }  px-2 rounded`}
              onClick={handleComments}
            >
              {isLoading ? "Loading..." : "Comments"}
            </button>
          )}
          {session?.user?.email === user.email && (
            <button
              onClick={handleDelete}
              className={`${
                isDeleting ? "bg-red-600 disabled:opacity-75" : "bg-red-600"
              }  text-white px-2 rounded ml-2`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>

      {showComments && (
        <CommentSection
          comments={comments || {}}
          id={id}
          email={session?.user.email}
        ></CommentSection>
      )}
    </div>
  );
}

export default PostInfo;
