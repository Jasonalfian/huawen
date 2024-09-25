import { Button } from "@mui/material";
import LessonInfo from "../shared/LessonInfo";
import Link from "next/link";
import { LessonData } from "@/client/student";
import { STUDENT_URL } from "@/libs/constant";

type LessonCardProps = {
  data: LessonData;
};

const LessonCard = ({ data }: LessonCardProps) => {
  return (
    <div className="flex flex-col gap-1 w-full bg-theme-cream border-2 rounded-lg p-4">
      <LessonInfo data={data} />
      <div className="grid md:flex mt-2 gap-4">
        <Link href={`${STUDENT_URL.MATERIAL}${data.lesson_id}`}>
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
        <Link href={data.evaluation}>
          <Button
            fullWidth
            sx={{ background: "var(--theme-red)" }}
            variant="contained"
          >
            Class Evaluation
          </Button>
        </Link>
        <Link href={`${STUDENT_URL.TASK}${data.lesson_id}`}>
          <Button
            fullWidth
            sx={{ background: "var(--theme-red)" }}
            variant="contained"
          >
            Submit Task
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
