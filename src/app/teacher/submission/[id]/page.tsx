"use client";

import { SubmssionData, getSubmissions } from "@/client/teacher";
import Layout from "@/components/layout";
import React from "react";
import ExamAccordion from "./ExamAccordion";

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
  return (
    <Layout>
      <h1 className="text-4xl my-6">Task Submission</h1>
      {listSubmission.length > 0 ? (
        <div className="space-y-4">
          {listSubmission.map((submission) => {
            return (
              <ExamAccordion
                key={submission.student_id}
                submission={submission}
                fetchSubmissions={fetchSubmissions}
              />
            );
          })}
        </div>
      ) : (
        <p>No Submission submitted</p>
      )}
    </Layout>
  );
};

export default Submission;
