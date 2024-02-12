"use client";
import {useSession} from "next-auth/react";
import React, {useState} from "react";
import {UserType} from "../models/User";
import ErrorComponent from "./Error";
import sendConfessions from "../lib/sendConfession";
import AlertComponent from "./AlertComponent";

interface ConfessModalProps {
  data: UserType;
}
const ConfessModal: React.FC<ConfessModalProps> = ({data}) => {
  const {data: session}: any = useSession();
  const modalRef = React.useRef<HTMLDialogElement>(null);
  const [checked, setChecked] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    try {
      setLoading(true);
      console.log(
        checked ? "anon" : session?.user?.username ?? "anon",
        data.username,
        message
      );
      const res = await sendConfessions(
        checked ? "anon" : session?.user?.username,
        data.username,
        message
      );

      if (res) {
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const resetSuccess = () => {
    setSuccess(false); // Reset success state after alert is dismissed
  };
  const resetError = () => {
    setError(false); // Reset success state after alert is dismissed
  };
  return (
    <div>
      <button
        className="btn btn-primary w-[90%] m-auto flex items-center justify-center text-lg rounded-xl"
        onClick={() => modalRef && modalRef.current?.showModal()}
        disabled={
          data.username.toLowerCase() === session?.user?.username!.toLowerCase()
        }
      >
        Confess
      </button>
      <dialog id="my_modal_3" ref={modalRef} className="modal">
        <div className="modal-box w-[90vw] md:w-full">
          <h3 className="font-bold text-lg">
            aahah! I see what you are doing!
          </h3>
          <p className="py-4">Write something, make sure you can</p>
          <div className="modal-action w-full flex flex-col justify-center items-center">
            <form method="dialog" className="w-full">
              <button className="btn btn-sm btn-circle btn-primary absolute right-2 top-2">
                ✕
              </button>
              <textarea
                className="textarea textarea-bordered w-full rounded-xl"
                placeholder="i ..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
            </form>{" "}
            <div className="flex flex-col justify-center items-center gap-2 mt-[20px] w-full">
              <div className="flex flex-col  w-full items-center justify-center gap-x-2">
                <label htmlFor="">anon? share with our name?</label>{" "}
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  onClick={() => {
                    setChecked(!checked);
                  }}
                  checked={checked}
                />{" "}
              </div>
              <button
                className="btn btn-primary w-full flex items-center justify-center text-md rounded-xl"
                disabled={checked && !session?.user}
                onClick={handleSend}
              >
                {loading ? (
                  <span className="loading loading-spinner text-primary"></span>
                ) : (
                  `Send ${checked ? `anonymously` : ""}`
                )}
              </button>
              {checked && !session?.user && (
                <ErrorComponent
                  message="ahhh login first or flip the switch send anonymously"
                  style="w-full"
                />
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
        </div>
      </dialog>
    </div>
  );
};

export default ConfessModal;
