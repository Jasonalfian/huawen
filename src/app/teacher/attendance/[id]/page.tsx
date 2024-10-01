"use client";

import { AttendanceData, getLessonStudent } from "@/client/teacher";
import Layout from "@/components/layout";
import React from "react";

type AttendanceProps = {
  params: { id: string };
};

const Attendance = ({ params }: AttendanceProps) => {
  const [listAttendance, setListAttendance] = React.useState<AttendanceData[]>(
    []
  );

  React.useEffect(() => {
    getLessonStudent(params.id).then((res) => {
      if (res.data) {
        setListAttendance(res.data.data);
      }
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl my-6">Class Attendance</h1>
      {listAttendance.length > 0 ? (
        <div className="flex gap-2">
          {listAttendance.map((attendance) => {
            return (
              <div
                className="w-[50%] lg:w-[25%] border-2 h-[200px] rounded-lg p-2"
                key={attendance.student_id}
              >
                <p>{attendance.username}</p>
                <p>Attend: {attendance.attendance === 1 ? "true" : "false"}</p>
                <p
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  Evaluation: {attendance.evaluation}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Attendance found</p>
      )}
    </Layout>
  );
};

export default Attendance;
