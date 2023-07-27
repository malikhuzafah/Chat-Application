import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";

export default function Menus({ handleLogout }) {
  const [user, setUser] = React.useState(null);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    var temp = await axios.get("http://localhost:3000/api/users/me", {
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
    setUser(temp.data);
    setName(temp.data.name);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{name[0]}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: "#6f2232",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              // bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              bgcolor: "#6f2232",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem style={{ color: "white" }} onClick={handleClose}>
          <Avatar>{name[0]}</Avatar> {name}
        </MenuItem>
        <Divider />
        <MenuItem style={{ color: "white" }} onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" style={{ color: "white" }} />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem style={{ color: "white" }} onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" style={{ color: "white" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
