import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/Auth/LoginPage";
import RequireAuth from "../features/Auth/RequireAuth";
import AppHeader from "../components/AppHeader";
import { Box } from "@mui/material";
import Home from "../pages/Home";

const App = () => (
  <div className="App">
    <AppHeader />
    <Box sx={{ margin: 2 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/public" element={<div>Public</div>} />
        <Route
          path="/protected"
          element={
            <RequireAuth>
              <div>Protected</div>
            </RequireAuth>
          }
        />
      </Routes>
    </Box>
  </div>
);

export default App;
