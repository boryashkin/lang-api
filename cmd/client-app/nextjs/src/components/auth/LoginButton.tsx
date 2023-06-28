'use client';

import { signIn } from "next-auth/react";

export const LoginButton = () => {
    return (
      <button className="mx-4 relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" onClick={() => signIn()}>
        Log In
      </button>
    );
  };