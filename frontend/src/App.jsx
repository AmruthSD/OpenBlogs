import { Routes, Route } from "react-router-dom";
import NavbarComp from "./components/NavBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import useAuthStore from "./zustand/authStore";
import Cookies from "js-cookie";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/Dashboard";
import FullScreenSpinner from "./components/FullScreenSpinner";
import useLoadStateStore from "./zustand/loadStateStore";
// import AddBlog from "./pages/AddBlog";
// import Tags from "./pages/Tags";

export default function App() {
  const isLoading = useLoadStateStore((state) => state.isLoading);

  return (
    <>
      <NavbarComp />
      {isLoading && <FullScreenSpinner />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blogs" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        /* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        {/* <Route path="/blog/newblog" element={<ProtectedRoute><AddBlog /></ProtectedRoute>} />  */}
        {/* <Route path="/Tags" element={<Tags/>} /> */}
      </Routes>
    </>
  );
}
