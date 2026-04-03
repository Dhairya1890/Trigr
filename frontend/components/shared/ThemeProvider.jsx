"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const handleError = (e) => {
      // Suppress MetaMask/Chrome extension errors that crash the dev overlay
      const msg = e?.message || e?.reason?.message || "";
      const stack = e?.stack || e?.reason?.stack || "";
      
      if (
        msg.includes("MetaMask") || 
        msg.includes("inpage.js") ||
        msg.includes("Failed to connect to MetaMask") ||
        stack.includes("nkbihfbeogaeaoehlefnkodbefgpgknn") // MetaMask extension ID
      ) {
        console.warn("Filtered out MetaMask extension error:", msg);
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        return true;
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleError, true);
    
    // Also override standard window.onerror for older browser catches
    const oldOnError = window.onerror;
    window.onerror = (msg, url, line, col, error) => {
      if (msg?.includes("MetaMask") || url?.includes("nkbihfbeogaeaoehlefnkodbefgpgknn")) {
        return true; // Stop error from bubbling
      }
      return oldOnError ? oldOnError(msg, url, line, col, error) : false;
    };

    return () => {
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleError, true);
      window.onerror = oldOnError;
    };
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
