"use client";
import React, {useContext, useEffect, useState} from "react";
import UsersCard from "./Userscard";
import UserNotFoundCard from "./UserNotFoundCard";
import {UserType} from "../models/User";
import {UserContext, useUserContext} from "../context/context";

const Users = () => {
  const [searchInput, setSearchInput] = useState("");

  const {users} = useUserContext();
  const [filteredUsers, setFilteredUsers] = useState(users);
  useEffect(() => {
    const filtered = searchInput
      ? users.filter((user) =>
          user.username.toLowerCase().includes(searchInput.toLowerCase())
        )
      : users;

    setFilteredUsers(filtered);
  }, [searchInput, users]);

  return (
    <div className="w-[95%] m-auto mt-[40px]">
      <div className="flex w-[90%] flex-col gap-2 md:flex-row m-auto justify-between mb-[15px]">
        <p className="text-4xl font-extrabold">People</p>
        <input
          type="text"
          placeholder="Search user, e.g., @0xSiddesh"
          className="input input-bordered input-secondary rounded-2xl w-full max-w-md lg:max-w-lg"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4 justify-evenly">
          {filteredUsers.map((user, index) => (
            <div key={index}>
              <UsersCard data={user} />
            </div>
          ))}
        </div>
      ) : (
        <UserNotFoundCard input={searchInput} />
      )}
    </div>
  );
};

export default Users;
