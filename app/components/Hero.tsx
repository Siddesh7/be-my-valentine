"use client";
import {useSession} from "next-auth/react";
import React, {useEffect} from "react";
import {FaHeart} from "react-icons/fa6";
import addUser from "../lib/addUser";
import Link from "next/link";
import {UserType} from "../models/User";
import Image from "next/image";
interface HeroProps {
  leaderboard: UserType[];
}
const Hero: React.FC<HeroProps> = ({leaderboard}) => {
  const {data: session}: any = useSession();
  useEffect(() => {
    if (session?.user) {
      addUser(
        session?.user?.name!,
        session?.user?.username!,
        session?.user?.image!
      );
    }
  }, [session?.user?.username]);
  console.log(leaderboard);
  return (
    <div>
      <div className="hero mt-[10vh]">
        <div className="hero-content flex-col-reverse lg:items-start lg:flex-row-reverse gap-12">
          <div className="text-center lg:text-left lg:min-w-[45vw]">
            <h1 className="text-5xl font-bold flex flex-row gap-2 items-center text-">
              <p className="font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.rose.400),theme(colors.pink.400),theme(colors.purple.400),theme(colors.red.400),theme(colors.purple.400),theme(colors.pink.300),theme(colors.rose.400))] bg-[length:200%_auto] animate-gradient">
                Most Crushed
              </p>

              <FaHeart className=" text-primary text-4xl  mr-2 ml-0" />
            </h1>

            <div className="overflow-x-auto rounded-2xl border-[1px] border-primary mt-[15px]">
              <table className="table ">
                {/* head */}
                <thead className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-primary-content">
                  <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Username</th>

                    <th>Points Received</th>
                  </tr>
                </thead>
                <tbody className="bg-base-100 text-primary">
                  {leaderboard &&
                    leaderboard.map((user, index) => (
                      <tr key={index} className="py-2">
                        <td>{index + 1}</td>
                        <div className="avatar ml-[10px]">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              src={
                                user.image.length === 0
                                  ? "https://pbs.twimg.com/profile_images/1747284623246454784/8AjRzjBS_normal.jpg"
                                  : user.image
                              }
                              width={80}
                              height={80}
                              className="rounded-full"
                              alt={user.name!}
                            />
                          </div>
                        </div>

                        <td className="text-primary-content font-bold">
                          <a
                            href={`https://x.com/${user.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {user.username}
                          </a>
                        </td>

                        <td className="text-primary-content font-bold">
                          {user.total}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card shrink-0 w-full max-w-xl min-h-[60vh] shadow-2xl bg-gradient-to-r from-pink-500 to-red-500 lg:min-w-[35vw] text-white">
            <div className="p-[30px] py-[50px] min-h-[60vh] flex-col justify-between">
              <div>
                {" "}
                <h1 className="text-5xl font-bold drop-shadow-md">
                  Cupid&apos;s Playground..!
                </h1>
                <p className="py-6 text-lg">
                  Ready to sprinkle a little magic on Twitter? 💖 Start sending
                  hearts, teddy bears, or chocolates, say it finally on feb 14.
                  It’s playful, mysterious, and utterly enchanting.
                </p>
              </div>
              <Link href="/play">
                {" "}
                <button className="btn bg-white text-red-500 font-bold py-2 px-4 rounded hover:bg-red-100 transition duration-300 ease-in-out">
                  Unleash Love
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
