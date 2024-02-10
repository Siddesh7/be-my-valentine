"use client";
import React, {useContext, useEffect, useState} from "react";
import {TwitterSignInButton} from "../components/TwitterLogin";
import Image from "next/image";
import {useSession, signOut} from "next-auth/react";
import {FaHandHolding} from "react-icons/fa6";
import {UserContext, useUserContext} from "../context/context";
import Link from "next/link";

const Navbar = () => {
  const {data: session}: {data: any} = useSession();

  const [logo, setLogo] = useState<any>("");
  const {user} = useUserContext();

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

  return (
    <div className="pt-[20px]">
      <div className="navbar bg-base-100 rounded-full w-[96vw] m-auto  flex justify-between">
        <Link href="/">
          <div className="flex-1 ml-[20px]">
            <Image src="/logo.png" width={150} height={500} alt="logo" />
          </div>
        </Link>

        {session ? (
          <div className="flex-none gap-2 text-primary">
            <div
              className="badge py-[15px] tooltip tooltip-bottom flex flex-row items-center"
              data-tip={`${
                user?.reactionCount && user?.reactionCount[date]
              } reactions available`}
            >
              <span className="text-xl md:text-2xl"> {logo}</span>
              <span className="font-bold text-lg md:text-xl ml-2">
                {user?.reactionCount && user?.reactionCount[date]}
              </span>
            </div>

            <p className="text-primary-content">
              hi, <span className="text-primary">{session?.user?.name}</span>!
            </p>
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    src={session?.user?.image!}
                    width={500}
                    height={500}
                    alt="user"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary text-primary-content rounded-box w-52"
              >
                <li>
                  <p>@{session?.user?.username}</p>
                </li>
                <li>
                  <a
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <TwitterSignInButton />
        )}
      </div>
    </div>
  );
};

export default Navbar;
