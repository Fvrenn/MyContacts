import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function RedirectIfAuthenticated() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          navigate("/");
        }
      } catch (e) {
      }
    }
  }, [navigate]);

  return <Outlet />;
}

export default RedirectIfAuthenticated;