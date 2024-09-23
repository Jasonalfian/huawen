"use client";

import "./globals.css";
import { cn } from "@/utils/utils";
import { fonts } from "@/libs/fonts";
import useGlobalStore from "@/libs/global";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token, initializeToken } = useGlobalStore();
  const [isHomePage, setIsHomePage] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      initializeToken();
      setIsHomePage(window.location.pathname === "/");
    }
  }, []);

  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--theme-red)" />
              <stop offset="100%" stopColor="var(--theme-yellow)" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
          size={50}
        />
      </React.Fragment>
    );
  }

  return (
    <html lang="en">
      <body className={cn(`antialiased`, fonts.inter.className)}>
        {isHomePage || token ? (
          <>
            {children}
            <Toaster />
          </>
        ) : (
          <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <GradientCircularProgress />
          </div>
        )}
      </body>
    </html>
  );
}
