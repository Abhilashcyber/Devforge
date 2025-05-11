import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:8000/token", {
                username,
                password,
            });
            const { access_token } = response.data;
            localStorage.setItem("token", access_token);
            const userResponse = await axios.get("http://localhost:8000/users/me", {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            setAuthUser(userResponse.data);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ authUser, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}