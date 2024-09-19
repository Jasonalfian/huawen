import Layout from "@/components/layout";
import React from "react";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Link from "next/link";

export default function Homework() {
  return (
    <Layout>
      <h1 className="text-4xl mt-6 mb-4">
        <Link href="/home">
          <ArrowBackOutlinedIcon fontSize="large" />
        </Link>
        Homework / Unit Review
      </h1>

      <div className="text-2xl font-medium text-black p-4 border-2 bg-theme-yellow rounded-lg mb-4">
        <h2>一 分 钱 一分 货 p a r t 1 . </h2>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <p>
          <TimerOutlinedIcon /> Deadline submission: 12 November 2024 00:00
        </p>
        <p>
          <SchoolOutlinedIcon /> 张老师
        </p>
        <p>
          <EventNoteOutlinedIcon /> HSK45_0001
        </p>
      </div>

      <div>
        <h2 className="text-xl mb-2 font-bold"> • Homework</h2>
        <div className="text-black p-4 border-2 bg-theme-cream rounded-lg">
          <p className="mb-2">
            Describe the person on the picture below in 500 words.
          </p>
          <p className="mb-1 text-sm">Attachment Information:</p>
          <Image
            src="/img/mock-dp.avif"
            alt="Company Logo"
            width={250}
            height={250}
            className="rounded-xl"
            priority
          />
        </div>
      </div>

      <Divider style={{ margin: "20px -24px" }} sx={{ borderBottomWidth: 3 }} />

      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full">
          <h2 className="text-xl mb-2 font-bold"> • Homework Submission</h2>
          <div className="max-w-max text-black px-20 py-10 border-2 bg-theme-cream rounded-lg mb-4">
            <Button variant="contained" color="primary">
              Upload Here
            </Button>
            <p className="text-xs mt-2">*Maximum size 5mb</p>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xl mb-2 font-bold">• Homework Feedback</h2>
          <p className="mb-1">
            Score : <span className="font-bold">88/100</span>
          </p>
          <div className="text-black p-4 border-2 bg-theme-cream rounded-lg mb-4">
            <p className="mb-2"> Homework is done well.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
