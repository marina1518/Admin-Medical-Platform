import React, { useState } from "react";
import "./videochat.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const VideoChat = (props) => {
  const dr_email = props.dr_email;
  localStorage.setItem("patient_email", props.patient_email);
  localStorage.setItem("date", props.date);
  console.log("email from videochat", dr_email);

  const handleJoinMeeting = () => {
    localStorage.setItem("Dr_email", dr_email);
    localStorage.setItem("patient_email", props.patient_email);
    localStorage.setItem("date", props.date);
    localStorage.setItem("patient_name", props.patient_name);
  };

  return (
    <div>
      {props.button_state ? (
        <Link to="/doctor/meetingroom">
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleJoinMeeting}
          >
            Join Meeting
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleJoinMeeting}
          disabled
        >
          Join Meeting
        </Button>
      )}
    </div>
  );
};

export default VideoChat;
