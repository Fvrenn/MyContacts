import { Routes, Route } from "react-router-dom";
import Login from "@/auth/login/login";
import Signup from "@/auth/signup/signup";
import Home from "@/home/home";
import VerifyConnect from "@/layout/verifyconnect";
import RedirectIfAuthenticated from "@/layout/RedirectIfAuthenticated";

export default function App() {
  return (
    <Routes>
      <Route element={<RedirectIfAuthenticated />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<VerifyConnect />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}