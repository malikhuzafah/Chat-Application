import { TextField, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "../components/Auth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Auth>
      <div
        style={{
          display: "flex",
          marginTop: 10,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
          backgroundColor: "#1a1a1d",
          boxShadow: "0 5px 10px 5px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ width: "60%" }}>
          <div style={{ padding: 10 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              sx={{
                borderColor: "red",
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10, textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                axios
                  .post("http://localhost:3000/api/users/login", {
                    email,
                    password,
                  })
                  .then((res) => {
                    console.log(res);
                    localStorage.setItem("token", res.data);
                    window.location = "/";
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Login
            </Button>
          </div>
          <div style={{ padding: 10, textAlign: "center" }}>
            <Typography>
              Dont Have An Account? <Link to="/register">Register</Link>
            </Typography>
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default Login;
