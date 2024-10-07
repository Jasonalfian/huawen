"use client";

import { UngradedTaskData, getUngradedSubmissions } from "@/client/teacher";
import Layout from "@/components/layout";
import React from "react";
import HomeworkAccordion from "./HomeworkAccordion";
import ExamAccordion from "./ExamAccordion";
import { useTranslation } from "react-i18next";

const UngradedSubmission = () => {
  const [listUngraded, setListUngraded] = React.useState<UngradedTaskData[]>(
    []
  );

  const fetchUngradedTask = () => {
    getUngradedSubmissions().then((res) => {
      if (res.data) {
        setListUngraded(res.data.data);
      }
    });
  };

  React.useEffect(() => {
    fetchUngradedTask();
  }, []);

  const { t } = useTranslation();

  return (
    <Layout>
      <h1 className="text-3xl my-6">{t("ungraded.title")}</h1>
      {listUngraded.length > 0 ? (
        <div className="space-y-4">
          {listUngraded.map((task, index) => {
            return task.task_type === "HOMEWORK" ? (
              <HomeworkAccordion
                key={index}
                submission={task}
                fetchSubmissions={fetchUngradedTask}
              />
            ) : (
              <ExamAccordion
                key={index}
                submission={task}
                fetchSubmissions={fetchUngradedTask}
              />
            );
          })}
        </div>
      ) : (
        <p>{t("common.no_data")}</p>
      )}
    </Layout>
  );
};

export default UngradedSubmission;
