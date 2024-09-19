import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginAuth = async (email, password, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? `${apiUrl}admin-login/` : `${apiUrl}user/login/`;
      const response = await axios.post(endpoint, { email, password });
      const { token, user } = response.data;
      console.log("API 回應:", response.data);

      localStorage.setItem("token", token);
      setUser(user);
      return user;
    } catch (error) {
      console.error("登入失敗:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const validateToken = async () => {
    const token = localStorage.getItem("token");
    console.log("Stored token:", token); // 檢查 token 是否正確存儲

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}validate-token/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Token 驗證失敗:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const value = {
    user,
    loginAuth,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <div>載入中...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth 必須在 AuthProvider 內使用");
  }
  return context;
};
