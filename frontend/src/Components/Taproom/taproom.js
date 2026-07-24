import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from '../../App';
import PlayersWanted from "./playerswanted.js"

function Taproom() {

  const isLoggedIn = useContext(LoggedInContext);

  const navigate = useNavigate();

  useEffect(() => {
    function sendHome(logStatus) {
      if (logStatus === false) {
        navigate("/home");
      }
    }
    sendHome(isLoggedIn);
  }, [])

  return (
    <div>
      <PlayersWanted />
    </div>
  );
};

export default Taproom;