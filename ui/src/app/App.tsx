import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/Auth/LoginPage";
import RequireAuth from "../features/Auth/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div>Home</div>} />
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
    </div>
  );
}

export default App;
