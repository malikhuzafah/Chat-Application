import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ChatList from "./ChatList";
import Chat from "./Chat";
import axios from "axios";
import Auth from "../components/Auth";
import Logout from "../components/Logout";

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
        // axios
        //   .get(`http://localhost:3000/api/chats/${chatId}`, {
        //     headers: {
        //       "x-auth-token": localStorage.getItem("token"),
        //     },
        //   })
        //   .then((res) => {
        //     if (res.data.length > 0) {
        //       if (res.data[0].user1 === user._id) {
        //         axios
        //           .get(`http://localhost:3000/api/users/${res.data[0].user2}`)
        //           .then((res) => {
        //             setSender(res.data);
        //           });
        //       } else {
        //         axios
        //           .get(`http://localhost:3000/api/users/${res.data[0].user1}`)
        //           .then((res) => {
        //             setSender(res.data);
        //           });
        //       }
        //     }
        //   });
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
                color: "blue",
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
                color: "blue",
                overflow: "auto",
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
