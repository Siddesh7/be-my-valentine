"use client";

import {signIn} from "next-auth/react";
import {FaXTwitter} from "react-icons/fa6";

export function TwitterSignInButton() {
  const handleClick = () => {
    signIn("twitter");
  };

  return (
    <button onClick={handleClick} className="btn  btn-primary">
      Login with <FaXTwitter className="ml-[6px]" />{" "}
    </button>
  );
}
