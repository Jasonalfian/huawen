"use client";

import Layout from "@/components/layout";
import React from "react";
import Divider from "@mui/material/Divider";
import { Button, TextField } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Link from "next/link";
import { TaskData, getTasks } from "@/client/student";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TaskAccordion } from "./TaskAccordion";

type TaskProps = {
  params: { id: string };
};

export default function Task({ params }: TaskProps) {
  const [listTask, setListTask] = React.useState<TaskData[]>([]);
  // const [lesson, setLesson] = React.useState<LessonData | undefined>();

  React.useEffect(() => {
    getTasks(params.id).then((res) => {
      if (res.data) {
        setListTask(res.data.data);
      }
    });
    // getLesson(params.id).then((res) => {
    //   if (res.data) {
    //     const lessonData: LessonData[] = res.data.data;
    //     setLesson(lessonData[0]);
    //   }
    // });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl md:text-4xl mt-6 mb-8">
        <Link href="/home">
          <ArrowBackOutlinedIcon fontSize="large" />
        </Link>
        Homework / Unit Review
      </h1>

      {listTask.map((task) => {
        return <TaskAccordion task={task} key={task.task_id} />;
      })}
    </Layout>
  );
}
