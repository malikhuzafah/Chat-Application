import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

export default function CustomTextField() {
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
        style={{ paddingLeft: 20 }}
        sx={{ ml: 1, flex: 1, backgroundColor: "#FFF" }}
        placeholder="Send a chat..."
        inputProps={{ "aria-label": "Send a chat..." }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <div style={{ padding: 5 }}>
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
          // onClick={handleSendMessage}
          size="large"
          style={{
            borderRadius: 25,
          }}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
}
