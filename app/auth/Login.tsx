"use client";

import { signIn } from "next-auth/react";

function Login() {
  return (
    <li>
      <button className="bg-blue-300 p-2 rounded" onClick={() => signIn()}>
        Sign In
      </button>
    </li>
  );
}

export default Login;
