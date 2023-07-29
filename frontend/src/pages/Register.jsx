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
          backgroundColor: "#1a1a1d",
          boxShadow: "0 5px 10px 5px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ width: "60%" }}>
          <div style={{ padding: 10, textAlign: "center" }}>
            <Typography
              variant="h3"
              style={{ color: "#efeee5", fontWeight: "bold" }}
            >
              Register
            </Typography>
          </div>
          <div style={{ padding: 10 }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
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
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div style={{ padding: 10 }}>
            <TextField
              autoFocus
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
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
              onChange={(e) => {
                setEmail(e.target.value);
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
              sx={{
                color: "#efeee5",
                backgroundColor: "#6f2232",
                ":hover": {
                  backgroundColor: "#1a1a1d",
                  // color: "#6f2232",
                },
              }}
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
          <div style={{ textAlign: "center", color: "#efeee5" }}>
            <Typography>
              Already have an account?{" "}
              <Link style={{ color: "#efeee5" }} to="/login">
                Login
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default Register;
