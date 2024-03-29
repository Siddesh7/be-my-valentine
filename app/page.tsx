"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import {useSession} from "next-auth/react";
import {UserType} from "./models/User";
import React, {useEffect, useState} from "react";
import {UserContext} from "./context/context";
import Footer from "./components/Footer";

export default function Home() {
  const {data: session}: any = useSession();
  const [user, setUser] = useState<UserType>({} as UserType);
  const [users, setUsers] = useState<UserType[]>([] as UserType[]);
  const [leaderboard, setLeaderboard] = useState<UserType[]>([] as UserType[]);
  const getUser = async () => {
    try {
      console.log("fetching user from page");
      const response = await fetch(
        `/api/user?username=${session?.user?.username}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUser(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  async function getAllUsers() {
    const res = await fetch("/api/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.status.toString());
    }
    return await res.json();
  }
  const getLeaderboard = async () => {
    const res = await fetch("/api/leaderboard", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.data);
    setLeaderboard(data.data);
  };
  useEffect(() => {
    if (session?.user) {
      getUser();
    }
  }, [session]);
  useEffect(() => {
    getLeaderboard();
  }, []);
  return (
    <main className="bg-base-200 min-h-screen">
      <UserContext.Provider value={{user, users, getUser, getAllUsers}}>
        <Navbar />
        <Hero leaderboard={leaderboard} />
        <Footer />
      </UserContext.Provider>
    </main>
  );
}
