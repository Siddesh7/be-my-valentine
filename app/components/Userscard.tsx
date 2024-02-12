"use client";
import {useSession} from "next-auth/react";
import Image from "next/image";
import React, {useContext, useEffect, useState} from "react";
import {FaHandHolding} from "react-icons/fa6";
import {RiBearSmileFill} from "react-icons/ri";
import sendReaction from "../lib/sendReaction";
import AlertComponent from "./AlertComponent";
import {UserContext, useUserContext} from "../context/context";
import {UserType} from "../models/User";
import ConfessModal from "./ConfessModal";

interface UsersCardProps {
  data: UserType;
}
const UsersCard: React.FC<UsersCardProps> = ({data}) => {
  const {data: session}: any = useSession();
  const [logo, setLogo] = useState<any>("🫂");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const {user, getUser, getAllUsers} = useUserContext();

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

  const handleSendReaction = async () => {
    getUser();
    setLoading(true);
    const res = await sendReaction(
      session?.user?.username,
      data?.username,
      date
    );
    setLoading(false);
    if (res) {
      setSuccess(true);
      getAllUsers();
    } else {
      setError(true);
    }
  };

  const resetSuccess = () => {
    setSuccess(false); // Reset success state after alert is dismissed
  };
  const resetError = () => {
    setError(false); // Reset success state after alert is dismissed
  };
  const fallbackImage =
    "https://pbs.twimg.com/profile_images/1747284623246454784/8AjRzjBS_normal.jpg";
  return (
    <div className="w-[95%] mb-[25px] m-auto">
      <div className="card w-[90%] py-[25px] bg-base-100 shadow-xl m-auto">
        <figure>
          <Image
            src={
              data.image.length === 0
                ? "https://pbs.twimg.com/profile_images/1747284623246454784/8AjRzjBS_normal.jpg"
                : data.image
            }
            width="100"
            height="100"
            className="rounded-full w-20 h-20 m-auto mt-4"
            alt={data.name!}
          />
        </figure>
        <div className="card-body">
          <a
            href={`http://x.com/${data?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-title"
          >
            {data.name.length == 0 ? data.username : data.name}
          </a>
          <div className="badge badge-secondary">
            {" "}
            <a
              href={`http://x.com/${data?.username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.username!}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {" "}
            <div className="badge badge-outline">
              {data.scores[10]}
              <RiBearSmileFill className="mx-[2px]" />
            </div>
            <div className="badge badge-outline">
              {data.scores[11]} <FaHandHolding className="mx-[2px]" />
            </div>
            <div className="badge badge-outline"> {data.scores[12]} 🫂</div>
            <div className="badge badge-outline"> {data.scores[13]}💋</div>
          </div>
        </div>
        {loading ? (
          <button
            className="btn btn-primary w-[90%] m-auto text-lg rounded-xl"
            disabled
          >
            <span className="loading loading-spinner text-primary"></span>
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            {" "}
            <button
              onClick={handleSendReaction}
              className="btn btn-primary w-[90%] m-auto flex items-center justify-center text-lg rounded-xl"
              disabled={
                data.username.toLowerCase() ===
                  session?.user?.username!.toLowerCase() ||
                (user?.reactionCount && user?.reactionCount[date] === 0) ||
                !session?.user
              }
            >
              {!session?.user ? (
                <span className="flex gap-x-2">
                  Login to give <span className="text-2xl">{logo}</span>
                </span>
              ) : (
                <span>
                  Give <span className="text-2xl">{logo}</span>
                </span>
              )}
            </button>
            <ConfessModal data={data} />
          </div>
        )}
        {success && (
          <AlertComponent
            message="wow, we just sent your reaction"
            type="success"
            onDismiss={resetSuccess}
          />
        )}
        {error && (
          <AlertComponent
            message="Error! Try Again!"
            type="error"
            onDismiss={resetError}
          />
        )}
      </div>
    </div>
  );
};

export default UsersCard;
