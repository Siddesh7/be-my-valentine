"use client";
import React, {useContext, useEffect, useState} from "react";
import UsersCard from "./Userscard";
import UserNotFoundCard from "./UserNotFoundCard";
import {UserType} from "../models/User";
import {UserContext, useUserContext} from "../context/context";
import {FaHandHolding} from "react-icons/fa6";

const Users = () => {
  const [searchInput, setSearchInput] = useState("");

  const {users} = useUserContext();
  const [filteredUsers, setFilteredUsers] = useState(users);

  const [logo, setLogo] = useState<any>("");

  const date = new Date().getDate();
  useEffect(() => {
    switch (date) {
      case 9:
        setLogo("🍫");
        break;
      case 10:
        setLogo("🐻");
        break;
      case 11:
        setLogo(<FaHandHolding />);
        break;
      case 12:
        setLogo("🫂");
        break;
      case 13:
        setLogo("💋");
        break;
      case 14:
        setLogo("💙");
        break;
      default:
        setLogo("💙");
    }
  }, [date]);
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
        <p className="text-4xl font-extrabold">
          People <span className="text-primary text-xl">({users?.length})</span>
        </p>

        <input
          type="text"
          placeholder="Search user, e.g., @0xSiddesh"
          className="input input-bordered input-secondary rounded-2xl w-full max-w-md lg:max-w-lg"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <p className="text-xl w-[88%] md:w-[90%] m-auto my-[20px] text-primary">
        If you don&apos;t see the user listed, just type their username above
        and send them teddy. make a tweet later and let them try out without you
        directly inviting.
      </p>
      <div
        role="alert"
        className="alert alert-info w-[86%] md:w-[96%] mb-[20px] m-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div className="flex flex-col md:flex-row md:gap-2 justify-center items-center ">
          <span className="w-full">
            Everyday you get 20 reactions, to spend. Since today is Feb {date},
            you get 20
          </span>
          <span className="text-xl text-primary ">{logo}</span>
        </div>
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
