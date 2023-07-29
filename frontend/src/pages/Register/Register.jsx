import React from "react";
import "./register.css";
import { TextField, Button, Typography } from "@mui/material";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Auth from "../../components/Auth";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Auth>
      <div className="main">
        <div className="main-content">
          <div className="pad10 text-center">
            <Typography variant="h3" className="main-heading text">
              Register
            </Typography>
          </div>
          <div className="pad10">
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
          <div className="pad10">
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
          <div className="pad10">
            <TextField
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
          <div className="pad10 text-center">
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
          <div className="text-center text">
            <Typography>
              Already have an account?{" "}
              <Link className="text" to="/login">
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
