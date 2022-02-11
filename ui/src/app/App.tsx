import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import AppHeader from "../components/AppHeader";
import { Box } from "@mui/material";
import Home from "../pages/Home";
import CoachListPage from "../pages/CoachListPage";
import CoachDetailPage from "../pages/CoachDetailPage";
import ClientDetailPage from "../pages/ClientDetailPage";
import CreateUserPage from "../pages/CreateUserPage";

const App = () => (
  <div className="App">
    <AppHeader />
    <Box sx={{ margin: 2 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/public" element={<div>Public</div>} />
        <Route path="/coaches" element={<CoachListPage />} />
        <Route path="/coaches/:coachId" element={<CoachDetailPage />} />
        <Route path="/clients/:clientId" element={<ClientDetailPage />} />
        <Route path="/user/create" element={<CreateUserPage />} />
      </Routes>
    </Box>
  </div>
);

export default App;
