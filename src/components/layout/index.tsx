"use client";

import React, { useState } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";

type LayoutProps = {
  isLandingPage?: boolean;
  children: React.ReactNode; // Include children here
};

export default function Layout({
  isLandingPage,
  children,
}: Readonly<LayoutProps>) {
  // Concatenate page title (if exists) to site title
  let titleConcat = "Responsive Sidebar Example";

  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <title>{titleConcat}</title>
      </Head>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <NavbarMobile isLandingPage={isLandingPage} setter={setShowSidebar} />
        <Navbar
          isLandingPage={isLandingPage}
          show={showSidebar}
          setter={setShowSidebar}
        />

        {/* Main Content */}
        <div className="flex flex-col flex-grow min-h-screen md:ml-[250px] overflow-y-auto">
          <div className="relative flex flex-col mt-[80px] p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
