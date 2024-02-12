"use client";
import React, {useEffect, useState} from "react";
import {getPointsSpent} from "../lib/getPointsSpent";
import {getConfessions} from "../lib/getConfessions";
interface ReactionsProps {
  username: string;
}
const Reactions = ({username}: ReactionsProps) => {
  const [reaction, setReaction] = useState<any>([]);
  const [showSent, setShowSent] = useState<boolean>(false);
  const getConfessionsForUser = async () => {
    const res = await getConfessions(username);
    setReaction(res);
    console.log(res);
  };
  useEffect(() => {
    getConfessionsForUser();
  }, [username]);
  return (
    <div>
      {" "}
      {reaction && (
        <div className="max-w-[95vw] m-auto">
          <div className="my-[30px] max-w-[90vw] m-auto">
            <div className="flex items-center justify-between gap-x-2">
              <p className="text-xl md:text-4xl font-extrabold">
                {showSent ? "Confessions Sent" : "Confessions Received"}
              </p>
              <div className="flex gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={showSent}
                  onChange={() => setShowSent(!showSent)}
                />
                <p className="text-md font-bold text-primary">Show Sent</p>
              </div>
            </div>
            <div className="overflow-x-auto mt-[15px]">
              {showSent ? (
                <div className="flex flex-col gap-2">
                  {reaction?.reactionsSent &&
                    reaction?.reactionsSent.map(
                      (reaction: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="card w-full bg-base-100 text-primary-content"
                          >
                            <div className="card-body">
                              {reaction?.from !== "anon" ? (
                                <h2 className="card-title">
                                  Sent to{" "}
                                  <span className="text-primary">
                                    {reaction?.to}
                                  </span>
                                </h2>
                              ) : (
                                <span className="badge badge-primary text-white">
                                  Anonymous
                                </span>
                              )}
                              <p>{reaction?.message}</p>
                              <div className="card-actions justify-end">
                                <p className="text-right">
                                  {new Date(
                                    reaction?.createdAt
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  {reaction?.reactionsSent?.length === 0 && (
                    <div className="card w-full bg-base-100 text-primary-content">
                      <div className="card-body">
                        <h2 className="card-title">No reactions sent</h2>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {reaction.reactionsReceived &&
                    reaction.reactionsReceived.map(
                      (reaction: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="card w-full bg-base-100 text-primary-content"
                          >
                            <div className="card-body">
                              {reaction?.from !== "anon" ? (
                                <h2 className="card-title">
                                  Received from{" "}
                                  <span className="text-primary">
                                    {reaction?.from}
                                  </span>
                                </h2>
                              ) : (
                                <span className="badge badge-primary text-white">
                                  Anonymous
                                </span>
                              )}
                              <p>{reaction?.message}</p>
                              <div className="card-actions justify-end">
                                <p className="text-right">
                                  {new Date(
                                    reaction?.createdAt
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  {reaction?.reactionsReceived?.length === 0 && (
                    <div className="card w-full bg-base-100 text-primary-content">
                      <div className="card-body">
                        <h2 className="card-title">No reactions received</h2>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reactions;
