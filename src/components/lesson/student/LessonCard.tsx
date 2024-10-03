import { Button } from "@mui/material";
import LessonInfo from "../../shared/LessonInfo";
import Link from "next/link";
import { LessonData } from "@/client/student";
import { STUDENT_URL } from "@/libs/constant";
import { PriorityHigh } from "@mui/icons-material";

type LessonCardProps = {
  data: LessonData;
};

const LessonCard = ({ data }: LessonCardProps) => {
  const needAttention = data.need_attention === 1;

  return (
    <div className="flex flex-col gap-1 w-full bg-theme-cream border-2 rounded-lg p-4">
      <LessonInfo data={data} />
      <div className="grid md:flex mt-2 gap-4">
        <Link href={`${STUDENT_URL.MATERIAL}/${data.lesson_id}`}>
          <Button fullWidth sx={{ background: "black" }} variant="contained">
            Class Materials
          </Button>
        </Link>
        <Link target="none" href={data.zoom_link}>
          <Button fullWidth sx={{ background: "black" }} variant="contained">
            Join Class
          </Button>
        </Link>
        <Link href={data.evaluation ?? ""}>
          <Button fullWidth sx={{ background: "black" }} variant="contained">
            Class Evaluation
          </Button>
        </Link>
        <Link href={`${STUDENT_URL.TASK}/${data.lesson_id}`}>
          <Button
            fullWidth
            sx={{
              background: needAttention ? "var(--theme-red)" : "black",
            }}
            variant="contained"
          >
            Submit {data.task_type ?? ""} {needAttention && <PriorityHigh />}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
