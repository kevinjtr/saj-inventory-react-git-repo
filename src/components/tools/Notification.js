import { AlertContext } from "../context/AlertProvider";
import { AlertTitle, Alert as MuiAlert } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { useContext, useEffect } from "react";
import moment from "moment"

const NotifyLayoutRoot = styled('div')(({ theme }) => ({
    //position: "absolute",
    position: "absolute",
    top: 65,
    right:10,
    //bottom: theme.spacing(2),
    zIndex: 2000,
    minWidth:"400px",
    //textAlign:"center",
    //left: "calc(50% + 250px)",
    //transform: "translateX(-50%)",
    width: "calc(100% - 250px)",
  }));

export default function Notification(props) {
  const { state, actions } = useContext(AlertContext);
  const handleClose = (alert) => {
    actions.removeAlert(alert);
  };
  return (
    <NotifyLayoutRoot>
      {state?.alerts.length > 0 &&
        state.alerts.map((alert, index) => (
          <SnackbarProvider
            key={alert.id + index}
            alert={alert}
            actions={actions}
            handleClose={handleClose}
            {...props}
          />
        ))}
    </NotifyLayoutRoot>
  );
}

function SnackbarProvider({ duration = 5000, alert, handleClose }) {

  useEffect(() => {
    const timer = setTimeout(() => handleClose(alert), duration);
    return () => {
      clearTimeout(timer);
    };
  }, [alert, duration, handleClose]);

  return (
    <MuiAlert
      sx={{marginBottom: 2}}
      onClose={() => handleClose(alert)}
      id={alert.id}
      elevation={6}
      severity={alert.type}
      variant={"filled"}
    >
    {alert.title}{alert.show_date ? ` - ${moment(alert.id).format("MMM DD yy hh:mm:ss")}` : ""}
    </MuiAlert>
  );
}