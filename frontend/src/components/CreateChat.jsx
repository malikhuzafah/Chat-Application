import React, { useState } from "react";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

export default function CreateChat() {
  const [scroll, setScroll] = React.useState("paper");
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleClickOpen = (scrollType) => () => {
    console.log(search);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => console.log(err));
  }, [open]);

  return (
    <>
      <IconButton
        aria-label="delete"
        // color="#6f2232"
        sx={{
          color: "#efeee5",
          backgroundColor: "#6f2232",
          ":hover": {
            backgroundColor: "#efeee5",
            color: "#6f2232",
          },
        }}
        onClick={handleClickOpen("paper")}
        style={{
          // color: "#efeee5",
          // backgroundColor: "#6f2232",
          height: "50px",
          width: "50px",
        }}
      >
        <ChatIcon />
        {/* <AddIcon /> */}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div style={{ backgroundColor: "#6f2232", color: "white" }}>
          <DialogTitle id="scroll-dialog-title">Start a chat</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              style={{ color: "#999" }}
            >
              To start a chat, tap on the user you want to start a chat with.
            </DialogContentText>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#efeee5",
                },
                "& .MuiInputLabel-root": {
                  color: "#efeee5",
                },
                "&:not(.Mui-focused) fieldset": {
                  borderColor: "#efeee5",
                },
                "&:not(.Mui-focused):hover fieldset": {
                  borderColor: "#efeee5",
                },
                input: {
                  color: "white",
                },
                // "input + .MuiOutlinedInput-notchedOutline": {
                //   backgroundColor: "#6f2232",
                // },
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Search Users"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              {results.map((result) => (
                <ListItem
                  style={{
                    borderRadius: 25,
                    marginBottom: 2,
                  }}
                  key={result._id}
                  button
                  onClick={() => {
                    axios
                      .post(
                        "http://localhost:3000/api/chats",
                        {
                          user: result._id.toString(),
                        },
                        {
                          headers: {
                            "x-auth-token": localStorage.getItem("token"),
                          },
                        }
                      )
                      .then((res) => {
                        window.location.reload();
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#999" }}>
                      {result.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={result.name}
                    secondary={result.email}
                  />
                </ListItem>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              sx={{
                color: "#efeee5",
                backgroundColor: "#1a1a1d",
                ":hover": {
                  backgroundColor: "#efeee5",
                  color: "#1a1a1d",
                },
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
