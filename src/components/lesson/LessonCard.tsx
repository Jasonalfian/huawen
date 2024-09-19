import { Button } from "@mui/material";
import LessonInfo from "../shared/LessonInfo";
import Link from "next/link";

const LessonCard = () => {
  return (
    <div className="flex flex-col gap-1 w-full bg-theme-cream border-2 rounded-lg p-4">
      <LessonInfo />
      <div className="grid md:flex mt-2 gap-4">
        <Link href="/material">
          <Button sx={{ background: "var(--theme-red)" }} variant="contained">
            Class Materials
          </Button>
        </Link>
        <Button sx={{ background: "var(--theme-red)" }} variant="contained">
          Join Class
        </Button>
        <Link href="/evaluation">
          <Button sx={{ background: "var(--theme-red)" }} variant="contained">
            Class Evaluation
          </Button>
        </Link>
        <Link href="/homework">
          <Button sx={{ background: "var(--theme-red)" }} variant="contained">
            Submit Task
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
