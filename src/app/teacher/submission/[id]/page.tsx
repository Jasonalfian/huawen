"use client";

import { SubmssionData, getSubmissions } from "@/client/teacher";
import Layout from "@/components/layout";
import React from "react";
import ExamAccordion from "./ExamAccordion";
import HomeworkAccordion from "./HomeworkAccordion";
import { useTranslation } from "react-i18next";

type SubmissionProps = {
  params: { id: string };
};

const Submission = ({ params }: SubmissionProps) => {
  const [listSubmission, setListSubmission] = React.useState<SubmssionData[]>(
    []
  );

  const fetchSubmissions = () => {
    getSubmissions(params.id).then((res) => {
      if (res.data) {
        const data: SubmssionData[] = res.data.data;
        setListSubmission(data);
      }
    });
  };

  React.useEffect(() => {
    fetchSubmissions();
  }, []);

  const { t } = useTranslation();

  return (
    <Layout>
      <h1 className="text-4xl my-6">{t("task.submission")}</h1>
      {listSubmission.length > 0 ? (
        <div className="space-y-4">
          {listSubmission.map((submission) => {
            return submission.task_type === "HOMEWORK" ? (
              <HomeworkAccordion
                key={submission.student_id}
                submission={submission}
                fetchSubmissions={fetchSubmissions}
              />
            ) : (
              <ExamAccordion
                key={submission.student_id}
                submission={submission}
                fetchSubmissions={fetchSubmissions}
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

export default Submission;
