"use client";

import { LessonData } from "@/client/student";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import dayjs from "dayjs";

type LessonInfoProps = {
  data?: LessonData;
};

const LessonInfo = ({ data }: LessonInfoProps) => {
  const startTime = dayjs(data?.start_time); // Start time
  const endTime = dayjs(data?.end_time); // End time

  // Format date as "01 September 2024 12:00 - 13:30"
  const formattedTime = `${startTime.format(
    "DD MMMM YYYY HH:mm"
  )} - ${endTime.format("HH:mm")}`;
  return (
    <>
      <h2 className="text-2xl mb-2">{data?.lesson_name ?? "-"}</h2>
      <p>
        <EventNoteOutlinedIcon /> {data?.class_name ?? "-"}
      </p>
      <p>
        <QueryBuilderOutlinedIcon /> {formattedTime ?? "-"}
      </p>
      <p>
        <SchoolOutlinedIcon /> {data?.teachers ?? "-"}
      </p>
    </>
  );
};

export default LessonInfo;
