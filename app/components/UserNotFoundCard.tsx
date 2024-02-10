"use client";
import {useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {FaHandHolding} from "react-icons/fa6";
import sendReaction from "../lib/sendReaction";
import {useUserContext} from "../context/context";
import AlertComponent from "./AlertComponent";

interface UserNotFoundCardProps {
  input: string;
}
const UserNotFoundCard: React.FC<UserNotFoundCardProps> = ({input}) => {
  const [logo, setLogo] = useState<any>("🫂");
  const {data: session}: any = useSession();
  const [username, setUsername] = useState<string>(input);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [points, setPoints] = useState(1);
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
  useEffect(() => {
    setUsername(input);
  }, [input]);
  const handleSendReaction = async (usernameInput: string) => {
    if (usernameInput.startsWith("@")) {
      usernameInput = usernameInput.slice(1);
    }
    console.log(session?.user?.username, usernameInput, date, points);
    getUser();
    setLoading(true);
    const res = await sendReaction(
      session?.user?.username,
      usernameInput,
      date,
      points
    );

    if (res) {
      setLoading(false);
      setSuccess(true);
    } else {
      setLoading(false);
      setError(true);
    }
  };
  const resetSuccess = () => {
    setSuccess(false); // Reset success state after alert is dismissed
  };
  const resetError = () => {
    setError(false); // Reset success state after alert is dismissed
  };
  return (
    <div className="w-[95%] mt-[40px] mb-[25px] m-auto">
      <div className="card py-[25px] bg-base-100 shadow-xl  ">
        <div className="card-body mx-[3%]">
          <h2 className="card-title ">
            No User found or User hasn&apos;t signed up or visited us just yet!
            But you can still send them some love.
          </h2>{" "}
        </div>
        <div className="flex flex-row justify-between w-[90%] m-auto gap-4">
          <input
            type="text"
            placeholder="Type the username you want to send love to, send to 0xSiddesh"
            className="input input-bordered input-primary  w-[70%] md:w-[90%] mb-[20px] rounded-2xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="number"
            placeholder="5 points"
            className="input input-bordered input-primary   w-[30%] md:w-[10%] mb-[20px] rounded-2xl"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>

        {loading ? (
          <button
            className="btn btn-primary w-[90%] m-auto text-lg rounded-xl"
            disabled
          >
            <span className="loading loading-spinner text-primary"></span>
          </button>
        ) : (
          <button
            onClick={() => {
              handleSendReaction(username);
            }}
            className="btn btn-primary w-[90%] m-auto text-lg rounded-xl"
            disabled={
              username.toLowerCase() ===
                session?.user?.username!.toLowerCase() ||
              (user.reactionCount && user?.reactionCount[date] === 0)
            }
          >
            Send them <span className="text-2xl">{logo}</span>
          </button>
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

export default UserNotFoundCard;
