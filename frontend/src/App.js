import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ChatScreen from "./pages/ChatScreen";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div style={{ padding: 20, height: "90vh" }}>
        <MenuBar />
        <div>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            {/* <Route path="/" element={<ChatList />}></Route> */}
            <Route path="/" element={<ChatScreen />} />
            {/* <Route path="/" element={<Chat />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
