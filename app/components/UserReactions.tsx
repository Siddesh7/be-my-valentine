"use client";
import React from "react";
import {useUserContext} from "../context/context";
import Reactions from "./Reactions";
import Confessions from "./Confessions";

const UserReactions = () => {
  const {user} = useUserContext();
  console.log(user);
  return (
    <div>
      {user && <Reactions username={user?.username} />}
      {user && <Confessions username={user?.username} />}
    </div>
  );
};

export default UserReactions;
