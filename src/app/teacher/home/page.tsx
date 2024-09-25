"use client";

import Layout from "@/components/layout";
import useGlobalStore from "@/libs/global";

const Home = () => {
  const { loginData } = useGlobalStore();

  return (
    <Layout>
      <p>{loginData?.role}</p>
    </Layout>
  );
};

export default Home;
