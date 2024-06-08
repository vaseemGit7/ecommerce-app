import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="h-full grid place-items-center bg-neutral-300">
      <div className="flex flex-col gap-2 items-center p-4 text-base bg-neutral-50 font-normal drop-shadow-md rounded-md">
        <p className="text-xl font-semibold">Session expired</p>
        <div className="text-center">
          <p>Your session has expired.</p>
          <p>You will be redirected to the Login page.</p>
          <p>
            In {countdown} {countdown > 1 ? "seconds" : "second"}
          </p>
        </div>
        <NavLink className="w-full text-center" to="/">
          <button className="w-4/5 mt-2 px-2 py-1 text-lg bg-neutral-800 text-neutral-50 font-medium drop-shadow rounded hover:scale-[1.02]">
            Login
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default SessionExpired;
