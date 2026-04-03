"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Restore session on mount
    try {
      const storedUser = localStorage.getItem("trigr_user");
      const storedRole = localStorage.getItem("trigr_role");

      if (storedUser && storedRole) {
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Auth initialization failed:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await api.login(credentials);
      if (res) {
        // More elegant name parsing for demo accounts
        let displayName = "Demo User";
        if (credentials.email?.includes("worker")) displayName = "Ravi Kumar";
        else if (credentials.email?.includes("insurer")) displayName = "Insurer Admin";
        else if (credentials.email?.includes("admin")) displayName = "System Admin";
        else if (credentials.email) displayName = credentials.email.split("@")[0];

        const userData = { id: res.worker_id || "demo_user", name: displayName };
        setUser(userData);
        setRole(res.role);
        setIsAuthenticated(true);
        
        localStorage.setItem("trigr_user", JSON.stringify(userData));
        localStorage.setItem("trigr_role", res.role);
        
        // Redirect based on role to specific dashboards
        if (res.role === "admin") router.push("/admin/analytics");
        else if (res.role === "insurer") router.push("/insurer/dashboard");
        else router.push("/worker/dashboard");
        
        return { success: true };
      }
      return { success: false, error: "Invalid credentials" };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("trigr_user");
    localStorage.removeItem("trigr_role");
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await api.registerWorker(data);
      if (res) {
        const userData = { id: res.worker_id, name: data.name };
        setUser(userData);
        setRole("worker");
        setIsAuthenticated(true);
        
        localStorage.setItem("trigr_user", JSON.stringify(userData));
        localStorage.setItem("trigr_role", "worker");
        
        return { success: true, data: res };
      }
      return { success: false, error: "Registration failed" };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Memoize value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user, 
    role, 
    isAuthenticated, 
    loading, 
    login, 
    logout, 
    signup
  }), [user, role, isAuthenticated, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
