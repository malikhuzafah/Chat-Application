import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import CreateChat from "../../components/CreateChat/CreateChat";
import SingleChat from "../../components/SingleChat/SingleChat";

function ChatList({ setChatId, setKey, setSender }) {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Simulated data for the chats
    // const chatsData = [
    //   { id: 1, title: "Chat 1", date: "2023-06-10" },
    //   { id: 2, title: "Chat 2", date: "2023-06-09" },
    //   { id: 3, title: "Chat 3", date: "2023-06-08" },
    //   { id: 4, title: "Chat 4", date: "2023-06-07" },
    // ];
    axios
      .get("http://localhost:3000/api/users/me", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        axios
          .get("http://localhost:3000/api/chats", {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          })
          .then(async (response) => {
            const chatsData = [];
            for (let i = 0; i < response.data.length; i++) {
              const chat = response.data[i];
              const senderId =
                chat.user1 === res.data._id ? chat.user2 : chat.user1;
              const title = (
                await axios.get(`http://localhost:3000/api/users/${senderId}`)
              ).data.name;
              const lastMessage = "hello";
              // chat.messages.length > 0
              //   ? chat.messages[chat.messages.length - 1].text
              //   : "";
              chatsData.push({ id: chat._id, title, lastMessage });
            }
            setChats(chatsData);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        borderRadius: 25,
        height: "100%",
        overflow: "auto",
        backgroundColor: "#1a1a1d",
        // backgroundColor: "#6f22315c",
        marginTop: window.innerWidth > 900 ? 0 : 10,
        color: "white",
      }}
    >
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Chats
        </Typography>
        <CreateChat />
      </div>
      <List>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <SingleChat
              user={user}
              setKey={setKey}
              setSender={setSender}
              chat={chat}
              setChatId={setChatId}
            />
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No chats found" />
          </ListItem>
        )}
      </List>
    </div>
  );
}

export default ChatList;
