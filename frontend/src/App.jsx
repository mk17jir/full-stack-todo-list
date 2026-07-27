import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,

          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#334155",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          },
        }}
      />

      <div
        className="
        min-h-screen
        bg-slate-50
        "
      >
        <Navbar search={search} setSearch={setSearch} />

        <main
          className="
          px-4
          sm:px-6
          lg:px-10
          py-6
          "
        >
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard search={search} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
