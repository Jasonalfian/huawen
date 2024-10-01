"use client";

import { AttendanceData, getLessonStudent } from "@/client/teacher";
import Layout from "@/components/layout";
import React from "react";
import AttendanceBox from "./AttendanceBox";

type AttendanceProps = {
  params: { id: string };
};

const Attendance = ({ params }: AttendanceProps) => {
  const [listAttendance, setListAttendance] = React.useState<AttendanceData[]>(
    []
  );

  const fetchAttendance = () => {
    getLessonStudent(params.id).then((res) => {
      if (res.data) {
        setListAttendance(res.data.data);
      }
    });
  };

  React.useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl my-6">Class Attendance</h1>
      {listAttendance.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {listAttendance.map((attendance) => {
            return (
              <AttendanceBox
                key={attendance.student_id}
                refetchData={fetchAttendance}
                attendance={attendance}
              />
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
