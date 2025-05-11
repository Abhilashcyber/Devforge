import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const ProtectedRoutes = () => {
    const auth = null;
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;