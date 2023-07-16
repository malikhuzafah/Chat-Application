import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function SingleChat({ chat, setChatId }) {
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
          setChatId(chat.id);
          console.log(chat.id);
        }}
      >
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={chat.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
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
            backgroundColor: "rgba(0,0,0, 0.25)",
            border: 0,
          }}
        />
      </div>
    </>
  );
}
