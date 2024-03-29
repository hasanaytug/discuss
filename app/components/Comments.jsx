import React from "react";
import Image from "next/image";

function Comments({ comments, id, newComments }) {
  return (
    <div>
      {newComments &&
        newComments.name.map((comment) => {
          return (
            <div>
              {comment.postId === id && (
                <div className="bg-gray-600 p-2 rounded-xl flex mt-1">
                  <Image
                    className="ml-4 rounded-full h-8 mx-h-8"
                    width={32}
                    height={32}
                    alt="user picture"
                    src={comment.User.image}
                  ></Image>
                  <p className="ml-4 text-white overflow-hidden">
                    {comment.title}
                  </p>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default Comments;
