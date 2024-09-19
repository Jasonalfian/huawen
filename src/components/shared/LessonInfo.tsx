import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const LessonInfo = () => {
  return (
    <>
      <h2 className="text-2xl mb-2">Lesson 1</h2>
      <p>
        <EventNoteOutlinedIcon /> HSK 4_0001
      </p>
      <p>
        <QueryBuilderOutlinedIcon /> 01 September 2024 12:00 - 13:30
      </p>
      <p>
        <SchoolOutlinedIcon /> 张老师
      </p>
    </>
  );
};

export default LessonInfo;
