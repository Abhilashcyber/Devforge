import { Outlet, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoutes = () => {
    const { currentUser, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;