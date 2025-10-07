import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Outlet } from "react-router-dom";

function VerifyConnect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
    } catch (e) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  return <Outlet />;
}

export default VerifyConnect;
