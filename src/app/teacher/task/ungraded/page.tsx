"use client";

import { getUngradedSubmissions } from "@/client/teacher";
import Layout from "@/components/layout";
import React from "react";

const UngradedSubmission = () => {
  React.useEffect(() => {
    getUngradedSubmissions().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Layout>
      <p>Tesss</p>
    </Layout>
  );
};

export default UngradedSubmission;
