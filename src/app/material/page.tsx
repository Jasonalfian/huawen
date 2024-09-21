"use client";

import Layout from "@/components/layout";
import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import LessonInfo from "@/components/shared/LessonInfo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Link from "next/link";

export default function Material() {
  return (
    <Layout>
      <h1 className="text-4xl mt-6">
        <Link href="/home">
          <ArrowBackOutlinedIcon fontSize="large" />
        </Link>
        Class Materials
      </h1>

      <div className="my-8 flex flex-col gap-1">
        <LessonInfo />
      </div>

      <div>
        <h2 className="text-xl mb-2 font-bold"> • Class Materials</h2>
        <PictureAsPdfIcon sx={{ fontSize: 80 }} />
      </div>
    </Layout>
  );
}
