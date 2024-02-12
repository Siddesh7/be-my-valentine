"use client";
import React, {useEffect, useState} from "react";
import {getPointsSpent} from "../lib/getPointsSpent";
interface ReactionsProps {
  username: string;
}
const Reactions = ({username}: ReactionsProps) => {
  const [reaction, setReaction] = useState<any>([]);
  const [showSent, setShowSent] = useState<boolean>(true);
  const getReactions = async () => {
    const res = await getPointsSpent(username);
    setReaction(res);
    console.log(res);
  };
  useEffect(() => {
    getReactions();
  }, [username]);
  return (
    <div>
      {" "}
      {reaction && (
        <div className="max-w-[95vw] m-auto">
          <div className="my-[30px] max-w-[90vw] m-auto">
            <div className="flex items-center justify-between gap-x-2">
              <p className="text-xl md:text-4xl font-extrabold">
                {showSent ? "Reactions Sent" : "Reactions Received"}
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
            <div className="overflow-x-auto rounded-2xl border-[1px] border-primary mt-[15px]">
              <table className="table ">
                <thead className="bg-gradient-to-r  from-pink-500 to-red-500 text-white text-primary-content">
                  {" "}
                  <tr>
                    <th></th>
                    <th className="w-[1/3]">{showSent ? "To" : "From"}</th>
                    <th className="w-[1/3]">Point</th>
                    <th className="w-[1/3]">Reaction</th>
                  </tr>
                </thead>
                {showSent ? (
                  <tbody>
                    {reaction.reactionsSent &&
                      reaction.reactionsSent.map(
                        (reaction: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{index}</td>
                              <td>{reaction.to}</td>
                              <td>{reaction.point}</td>
                              <td>{reaction.reaction}</td>
                            </tr>
                          );
                        }
                      )}
                    {reaction?.reactionsSent?.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No reactions sent
                        </td>
                      </tr>
                    )}
                  </tbody>
                ) : (
                  <tbody>
                    {reaction.reactionsReceived &&
                      reaction.reactionsReceived.map(
                        (reaction: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{index}</td>
                              <td>{reaction.from}</td>
                              <td>{reaction.point}</td>
                              <td>{reaction.reaction}</td>
                            </tr>
                          );
                        }
                      )}
                    {reaction?.reactionsReceived?.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No reactions Recieved
                        </td>
                      </tr>
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reactions;
