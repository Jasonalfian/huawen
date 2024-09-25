"use client";

import Layout from "@/components/layout";
import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Link from "next/link";
import { TaskData, getTasks } from "@/client/student";
import { TaskAccordion } from "./TaskAccordion";
import { STUDENT_URL } from "@/libs/constant";

type TaskProps = {
  params: { id: string };
};

export default function Task({ params }: TaskProps) {
  const [listTask, setListTask] = React.useState<TaskData[]>([]);

  React.useEffect(() => {
    getTasks(params.id).then((res) => {
      if (res.data) {
        setListTask(res.data.data);
      }
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl md:text-4xl mt-6 mb-8">
        <Link href={STUDENT_URL.HOME}>
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
