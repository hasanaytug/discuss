"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  image: string;
};

function Logged({ image }: User) {
  return (
    <li className="flex justify-center items-center">
      <button
        className="bg-blue-700 text-white p-2 rounded"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href="/dashboard">
        <Image
          className="ml-4 rounded-full"
          width={64}
          height={64}
          src={image}
          alt="user picture"
          priority
        />
      </Link>
    </li>
  );
}

export default Logged;
