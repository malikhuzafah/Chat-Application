import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import axios from "axios";
import { io } from "socket.io-client";
import CustomTextField from "../components/CustomTextField";

var socket;

const Chat = ({ chatId, user, sender }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const name = sender.name ? sender.name : "";

  const handleSendMessage = () => {
    socket.emit("stop typing", chatId);

    if (messageInput.trim() !== "") {
      const message = {
        chatId: chatId,
        message: messageInput,
        sender: user._id,
      };
      axios
        .post("http://localhost:3000/api/messages", message, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          var msg = res.data;
          var createdAt = new Date(msg.createdAt);
          var time = createdAt.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          msg.time = time;
          socket.emit("new message", msg);
          setMessages([...messages, msg]);
          setMessageInput("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    socket = io("http://localhost:3000");
    socket.emit("setup");
    socket.on("connected", () => {
      console.log("connected");
      getMessages();
    });
  }, []);

  useEffect(() => {
    socket.on("message recieved", (msg) => {
      setMessages([...messages, msg]);
    });

    // socket.on("typing", () => {
    //   setIsTyping(true);
    // });

    // socket.on("stop typing", () => {
    //   setIsTyping(false);
    // });
  });

  const getMessages = () => {
    axios
      .get(`http://localhost:3000/api/messages/${chatId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        var tempMessages = [];
        res.data.map((msg) => {
          var message = msg;
          var createdAt = new Date(msg.createdAt);
          var time = createdAt.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          message.time = time;
          tempMessages.push(message);
        });
        setMessages(tempMessages);
      })
      .catch((err) => console.log(err));
    socket.emit("join chat", chatId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        // padding: 10,
      }}
    >
      <div
        style={{
          // marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: 20,
          // backgroundColor: "#f5f5f5",
        }}
      >
        {sender.profilePicture ? (
          <Avatar
            alt="Sender Profile Picture"
            // src="/path/to/sender-profile-picture.jpg"
            style={{ marginRight: "8px" }}
          />
        ) : (
          <Avatar
            // src="/path/to/sender-profile-picture.jpg"
            style={{ marginRight: "8px" }}
          >
            {name[0]}
          </Avatar>
          // <Typography
          //   style={{
          //     // padding: "5",
          //     display: "flex",
          //     borderRadius: "50%",
          //     backgroundColor: "red",
          //     justifyContent: "center",
          //     alignItems: "center",
          //     height: 30,
          //     width: 30,
          //     marginRight: 10,
          //   }}
          // >
          //   {name[0]}
          // </Typography>
        )}
        <Typography variant="h6">{sender.name}</Typography>
      </div>
      <div
        style={{
          flex: 1,
          height: "100%",
          overflow: "auto",
          padding: 10,
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            overflow: "auto",
            marginBottom: 10,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                wordBreak: "break-word",
                justifyContent:
                  message.sender === user._id ? "flex-end" : "flex-start",
                margin: 10,
              }}
            >
              {message.sender !== user._id && (
                <Avatar
                  alt="Sender Profile Picture"
                  src="/path/to/sender-profile-picture.jpg"
                  style={{ marginRight: "8px" }}
                />
              )}
              <Typography
                variant="body1"
                style={{
                  borderRadius: 25,
                  padding: "10px 20px 5px 20px",
                  backgroundColor:
                    message.sender === user._id ? "#dcf8c6" : "#f0f0f0",
                  color: "#333",
                  maxWidth: "70%",
                }}
              >
                {message.message}
                <p
                  style={{
                    padding: "5px 0 0 0 ",
                    margin: 0,
                    fontSize: 12,
                    color: "#999",
                    textAlign: message.sender === user._id ? "start" : "end",
                  }}
                >
                  {message.time}
                </p>
              </Typography>
            </div>
          ))}
        </div>
      </div>
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 10,
          paddingLeft: 50,
          paddingRight: 50,
          // backgroundColor: "#f5f5f5",
          position: "sticky",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <input
          type="text"
          value={messageInput}
          placeholder="Send a chat..."
          onChange={(e) => setMessageInput(e.target.value)}
          style={{
            flex: 1,
            marginRight: 20,
            height: 50,
            borderRadius: 25,
            paddingLeft: "20px",
            paddingRight: "20px",
            fontSize: "20px",
          }}
        />
        <Button
          variant="contained"
          // color="primary"
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
          style={{
            borderRadius: 25,
            height: "50px",
            width: "100px",
          }}
        >
          Send
        </Button>
      </div> */}
      <div style={{ padding: 10, paddingInline: 50 }}>
        <CustomTextField
          handleSendMessage={handleSendMessage}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
        />
      </div>
    </div>
  );
};

export default Chat;
