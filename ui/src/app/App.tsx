import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import AppHeader from "../components/AppHeader";
import { Box } from "@mui/material";
import Home from "../pages/Home";
import CoachListPage from "../pages/CoachListPage";

const App = () => (
  <div className="App">
    <AppHeader />
    <Box sx={{ margin: 2 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/public" element={<div>Public</div>} />
        <Route path="/coaches" element={<CoachListPage />} />
      </Routes>
    </Box>
  </div>
);

export default App;
