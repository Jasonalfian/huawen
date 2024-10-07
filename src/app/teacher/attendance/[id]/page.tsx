"use client";

import { AttendanceData, getLessonStudent } from "@/client/teacher";
import Layout from "@/components/layout";
import React from "react";
import AttendanceBox from "./AttendanceBox";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <Layout>
      <h1 className="text-4xl my-6">{t("attendance.title")}</h1>
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
        <p>{t("common.no_data")}</p>
      )}
    </Layout>
  );
};

export default Attendance;
