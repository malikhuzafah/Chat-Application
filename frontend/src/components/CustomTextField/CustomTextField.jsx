import React, { useEffect } from "react";
import "./CustomTextField.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";

export default function CustomTextField({
  handleSendMessage,
  messageInput,
  setMessageInput,
  handleTyping,
  handleStopTyping,
}) {
  const handleChange = (event) => {
    handleTyping();
    setMessageInput(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleStopTyping();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [messageInput]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: 25,
      }}
    >
      {/* <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        className="input"
        sx={{ ml: 1, flex: 1, backgroundColor: "#FFF" }}
        placeholder="Send a chat..."
        inputProps={{ "aria-label": "Send a chat..." }}
        value={messageInput}
        onChange={handleChange}
        autoFocus
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <div className="sendContainer">
        <Button
          variant="contained"
          color="primary"
          sx={{
            color: "#efeee5",
            backgroundColor: "#6f2232",
            ":hover": {
              backgroundColor: "#efeee5",
              color: "#6f2232",
            },
          }}
          onClick={handleSendMessage}
          size="large"
          className="sendBtn"
        >
          Send
        </Button>
      </div>
    </Paper>
  );
}
