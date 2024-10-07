"use client";

import Layout from "@/components/layout";
import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Link from "next/link";
import { TaskData, getTasks } from "@/client/student";
import { TaskAccordion } from "./TaskAccordion";
import { STUDENT_URL } from "@/libs/constant";
import { useTranslation } from "react-i18next";

type TaskProps = {
  params: { id: string };
};

export default function Task({ params }: TaskProps) {
  const [listTask, setListTask] = React.useState<TaskData[]>([]);
  const [taskType, setTaskType] = React.useState("EXAM");

  const fetchTasks = () => {
    getTasks(params.id).then((res) => {
      if (res.data) {
        const data: TaskData[] = res.data.data;

        if (data && data.length > 0) {
          setListTask(data);
          setTaskType(data[0].task_type);
        }
      }
    });
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const { t } = useTranslation();

  return (
    <Layout>
      <h1 className="text-2xl md:text-4xl mt-6 mb-8">
        <Link href={STUDENT_URL.HOME}>
          <ArrowBackOutlinedIcon fontSize="large" />
        </Link>
        {t(taskType).toUpperCase()}
      </h1>

      {listTask.length > 0 ? (
        listTask.map((task) => {
          return (
            <TaskAccordion
              refetchTask={fetchTasks}
              task={task}
              key={task.task_id}
            />
          );
        })
      ) : (
        <p>{t("common.no_data")}</p>
      )}
    </Layout>
  );
}
