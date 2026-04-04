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
      // For this phase, handle demo auth explicitly and cleanly.
      // In a real app, this would be an api.login(credentials) fetch.
      // We parse the email to determine the demo role.
      let detectedRole = "worker";
      let displayName = "Demo User";

      if (credentials.email?.includes("admin")) {
        detectedRole = "admin";
        displayName = "System Admin";
      } else if (credentials.email?.includes("insurer")) {
        detectedRole = "insurer";
        displayName = "Insurer Admin";
      } else if (credentials.email?.includes("worker")) {
        detectedRole = "worker";
        displayName = "Ravi Kumar";
      } else if (credentials.email) {
        displayName = credentials.email.split("@")[0];
      }

      const userData = {
        id: detectedRole === "worker" ? "me" : `${detectedRole}_demo`,
        name: displayName,
        email: credentials.email || "",
      };
      
      setUser(userData);
      setRole(detectedRole);
      setIsAuthenticated(true);
      
      localStorage.setItem("trigr_user", JSON.stringify(userData));
      localStorage.setItem("trigr_role", detectedRole);
      
      // Redirect based on role
      if (detectedRole === "admin") router.push("/admin/analytics");
      else if (detectedRole === "insurer") router.push("/insurer/dashboard");
      else router.push("/worker/dashboard");
      
      return { success: true };
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
        const userData = { id: res.worker_id, name: data.name, email: data.email || "" };
        setUser(userData);
        setRole("worker");
        setIsAuthenticated(true);
        
        localStorage.setItem("trigr_user", JSON.stringify(userData));
        localStorage.setItem("trigr_role", "worker");
        
        // Post-signup redirect
        router.push("/worker/dashboard");
        
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
