import * as React from "react";
import AppBar from "@mui/material/AppBar";
import "./menuBar.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useNavigate, Link } from "react-router-dom";
import Menus from "../Menus/Menus";

const MenuBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = (e) => {
    // userService.logout();
    localStorage.removeItem("token");
    window.location = "/";
  };

  const isLoggedIn = () => {
    return localStorage.getItem("token");
  };

  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      className="app-bar"
      style={{ backgroundColor: "#1a1a1d" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <QuestionAnswerIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={(e) => {
              navigate("/");
            }}
          >
            ChatApp
          </Typography>

          <QuestionAnswerIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={(e) => {
              navigate("/");
            }}
          >
            Chat App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn() ? (
              <Menus handleLogout={logout} />
            ) : (
              isLoggedIn() && (
                <Link to="/login" className="link">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Login / Register
                  </Button>
                </Link>
              )
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuBar;
