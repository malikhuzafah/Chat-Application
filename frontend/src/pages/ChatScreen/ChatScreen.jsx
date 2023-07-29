import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ChatList from "../ChatList/ChatList";
import Chat from "../Chat/Chat";
import axios from "axios";
import Logout from "../../components/Logout";

const ChatScreen = () => {
  const [chatId, setChatId] = useState("");
  const [key, setKey] = useState(0);
  const [user, setUser] = useState({});
  const [sender, setSender] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/me", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Logout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          height: "85vh",
        }}
      >
        <Grid
          container
          spacing={3}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 25,
          }}
        >
          <Grid item xs={3}>
            <Paper
              style={{
                //   padding: 2,
                height: "100%",
                borderRadius: 25,
                backgroundColor: "#1a1a1d",
                color: "#efeee5",
                overflow: "hidden",
                boxShadow: "0 5px 10px 5px rgba(0, 0, 0, 0.25)",
              }}
            >
              <ChatList
                setChatId={setChatId}
                setKey={setKey}
                setSender={setSender}
              />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 25,
                color: "#efeee5",
                overflow: "auto",
                backgroundColor: "#1a1a1d",
                boxShadow: "0 5px 10px 5px rgba(0, 0, 0, 0.25)",
              }}
            >
              {chatId !== "" && (
                <Chat chatId={chatId} user={user} sender={sender} key={key} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Logout>
  );
};

export default ChatScreen;
