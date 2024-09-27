import { Button } from "@mui/material";
import Link from "next/link";
import { LessonData } from "@/client/teacher";
import { STUDENT_URL, TEACHER_URL } from "@/libs/constant";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

type LessonCardProps = {
  data: LessonData;
};

const LessonCard = ({ data }: LessonCardProps) => {
  return (
    <div className="flex flex-col gap-1 w-full bg-theme-cream border-2 rounded-lg p-4">
      <h2 className="text-2xl mb-2">Lesson 1</h2>
      <p>
        <EventNoteOutlinedIcon /> {data?.class_name ?? "-"}
      </p>
      <p>
        <QueryBuilderOutlinedIcon />{" "}
        {data.start_time ? `${data.start_time} - ${data.end_time}` : "-"}
      </p>
      <p>
        <SchoolOutlinedIcon /> {data?.teachers ?? "-"}
      </p>
      <div className="grid md:flex mt-2 gap-4">
        <Link href={`${TEACHER_URL.MATERIAL}/${data.lesson_id}`}>
          <Button
            fullWidth
            sx={{ background: "var(--theme-red)" }}
            variant="contained"
          >
            Class Materials
          </Button>
        </Link>
        <Link target="none" href={data.zoom_link}>
          <Button
            fullWidth
            sx={{ background: "var(--theme-red)" }}
            variant="contained"
          >
            Join Class
          </Button>
        </Link>
        <Link href={`${TEACHER_URL.TASK}/${data.lesson_id}`}>
          <Button
            fullWidth
            sx={{ background: "var(--theme-red)" }}
            variant="contained"
          >
            Task
          </Button>
        </Link>
        <Link href={`${TEACHER_URL.SUBMISSION}/${data.lesson_id}`}>
          <Button
            fullWidth
            sx={{ background: "var(--theme-red)" }}
            variant="contained"
          >
            Submission
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
