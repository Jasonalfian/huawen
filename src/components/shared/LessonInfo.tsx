"use client";

import { LessonData } from "@/client/student";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

type LessonInfoProps = {
  data?: LessonData;
};

const LessonInfo = ({ data }: LessonInfoProps) => {
  return (
    <>
      <h2 className="text-2xl mb-2">Lesson 1</h2>
      <p>
        <EventNoteOutlinedIcon /> {data?.class_name ?? "-"}
      </p>
      <p>
        <QueryBuilderOutlinedIcon /> {data?.start_time ?? "-"}
      </p>
      <p>
        <SchoolOutlinedIcon /> {data?.teachers ?? "-"}
      </p>
    </>
  );
};

export default LessonInfo;
