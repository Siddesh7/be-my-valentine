"use client";
import React from "react";
import {useUserContext} from "../context/context";
import Reactions from "./Reactions";
import Confessions from "./Confessions";
import ErrorComponent from "./Error";

const UserReactions = () => {
  const {user} = useUserContext();

  return (
    <div>
      {user && <Reactions username={user?.username} />}
      {user && <Confessions username={user?.username} />}
      {!user && (
        <ErrorComponent message="Login to see" style="w-[90vw] m-auto" />
      )}
    </div>
  );
};

export default UserReactions;
