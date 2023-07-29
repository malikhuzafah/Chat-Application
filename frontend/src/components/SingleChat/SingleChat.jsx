import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SingleChat({
  chat,
  setChatId,
  setKey,
  user,
  setSender,
}) {
  const [send1, setSend1] = useState(null);
  const [send, setSend] = useState({});

  const navigate = useNavigate();

  const senderName = async () => {
    var tempChat = await axios.get(
      `http://localhost:3000/api/chats/${chat.id}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    var sender;
    if (tempChat.data.user1 === user._id) {
      sender = await axios.get(
        `http://localhost:3000/api/users/${tempChat.data.user2}`
      );
    } else {
      sender = await axios.get(
        `http://localhost:3000/api/users/${tempChat.data.user1}`
      );
    }
    setSend(sender.data.name);
    setSend1(sender.data);
  };

  useEffect(() => {
    senderName();
  }, []);

  const getData = async () => {
    var tempChat = await axios.get(
      `http://localhost:3000/api/chats/${chat.id}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    var sender;
    if (tempChat.data.user1 === user._id) {
      sender = await axios.get(
        `http://localhost:3000/api/users/${tempChat.data.user2}`
      );
    } else {
      sender = await axios.get(
        `http://localhost:3000/api/users/${tempChat.data.user1}`
      );
    }
    setSender(sender.data);
  };

  return (
    <>
      {/* <ListItem
                style={{
                  borderRadius: 25,
                  marginBottom: 2,
                }}
                key={chat.id}
                button
              >
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={chat.title} secondary={chat.date} />
              </ListItem> */}

      <ListItem
        alignItems="flex-start"
        button
        style={{
          borderRadius: 25,
          // marginBottom: 2,
        }}
        onClick={() => {
          if (window.innerWidth > 900) {
            setKey(Math.random());
            setChatId(chat.id);
            getData();
          } else {
            console.log(send1);
            navigate("/chat", { chatId: chat.id, user: user, sender: send1 });
          }
        }}
      >
        <ListItemAvatar>
          {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" /> */}
          <Avatar style={{ backgroundColor: "#6f2232" }}>{send[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={chat.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="#efeee5"
              >
                {chat.lastMessage}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <hr
          style={{
            margin: 0,
            width: "80%",
            height: 1,
            backgroundColor: "rgba(239, 238, 229, 0.25)",
            border: 0,
          }}
        />
      </div>
    </>
  );
}
