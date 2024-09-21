"use client";

import Layout from "@/components/layout";
import Login from "@/modules/Login/Login";

export default function Home() {
  return (
    <Layout isLandingPage>
      <div className="flex flex-col items-center justify-center h-[60vh] mt-8">
        <Login />
      </div>
    </Layout>
  );
}
