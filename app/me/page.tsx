"use client";

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {UserType} from "../models/User";
import {getAllUsers} from "../lib/getAllUsers";
import {UserContext} from "../context/context";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import Footer from "../components/Footer";
import UserReactions from "../components/UserReactions";
import ErrorComponent from "../components/Error";

export default function Home() {
  const {data: session}: any = useSession();
  const [users, setUsers] = useState<UserType[]>([] as UserType[]); // [1]
  const [user, setUser] = useState<UserType>({} as UserType);

  const getUser = async () => {
    try {
      const response = await fetch(
        `/api/user?username=${session?.user?.username}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getUser();
    }
  }, [session]);
  async function getAllUsers() {
    console.log("fetching users from page play");
    const res = await fetch("/api/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(res.status.toString());
    }

    // Shuffle the array
    const shuffledData = shuffleArray(data.data);

    // Set the shuffled array to users
    setUsers(shuffledData);
  }

  // Fisher-Yates Shuffle algorithm
  function shuffleArray(array: UserType[]) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  useEffect(() => {
    (async () => {
      try {
        const users = await getAllUsers();
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // Handle the error appropriately
      }
    })();
  }, []);

  return (
    <main className="bg-base-200 min-h-screen">
      <UserContext.Provider value={{user, users, getUser, getAllUsers}}>
        <Navbar />
        {session?.user ? (
          <UserReactions />
        ) : (
          <ErrorComponent
            message="Login to see all the confessions received"
            style="w-[95vw] m-auto"
          />
        )}
        <Footer />
      </UserContext.Provider>
    </main>
  );
}
