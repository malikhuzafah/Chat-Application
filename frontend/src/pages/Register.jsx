import { TextField, Button, Typography } from "@mui/material";
import React from "react";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Auth from "../components/Auth";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <TextField
              style={{ borderRadius: 25 }}
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
              style={{ borderRadius: 25 }}
              variant="contained"
              color="primary"
              onClick={(e) => {
                axios
                  .post("http://localhost:3000/api/users/register", {
                    email,
                    name,
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
              Register
            </Button>
          </div>
          <div style={{ textAlign: "center" }}>
            <Typography>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default Register;
