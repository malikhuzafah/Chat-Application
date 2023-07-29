import "./Chat.css";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import axios from "axios";
import { io } from "socket.io-client";
import CustomTextField from "../../components/CustomTextField/CustomTextField";

var socket;

const Chat = ({ chatId, user, sender }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const name = sender.name ? sender.name : "";

  const handleTyping = () => {
    socket.emit("typing", chatId);
  };

  const handleStopTyping = () => {
    socket.emit("stop typing", chatId);
  };

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

    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stop typing", () => {
      setIsTyping(false);
    });
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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: 20,
          backgroundColor: "#6f22315c",
          borderRadius: 25,
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
            style={{ marginRight: "8px", backgroundColor: "#6f2232" }}
          >
            {name[0]}
          </Avatar>
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
                  // backgroundColor:
                  //   message.sender === user._id ? "#dcf8c6" : "#f0f0f0",
                  backgroundColor:
                    message.sender === user._id ? "#6f2232" : "#efeee5",
                  // color: "#333",
                  color: message.sender === user._id ? "#efeee5" : "#1a1a1a",
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
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <div style={{ padding: 10, paddingInline: 50 }}>
        <CustomTextField
          handleSendMessage={handleSendMessage}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleTyping={handleTyping}
          handleStopTyping={handleStopTyping}
        />
      </div>
    </div>
  );
};

export default Chat;
