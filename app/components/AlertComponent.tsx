import React, {useEffect} from "react";
interface AlertComponentProps {
  onDismiss?: () => void;
  message: string;
  type: "success" | "error";
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  onDismiss,
  message,
  type,
}) => {
  const [showAlert, setShowAlert] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
      if (onDismiss) onDismiss(); // Call the callback when dismissing the alert
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]); // Include onDismiss in the dependency array to handle prop changes

  return (
    <>
      {showAlert && (
        <div
          role="alert"
          className={`alert w-[90%] m-auto mt-[10px] ${
            type === "success" ? "alert-success" : "alert-error"
          }`}
        >
          {type === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <span>{message}</span>
        </div>
      )}
    </>
  );
};

export default AlertComponent;
