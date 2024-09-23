"use client";

import React from "react";
import Divider from "@mui/material/Divider";
import { Button, TextField } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import Link from "next/link";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TaskData, TaskScoreData, getTaskScore } from "@/client/student";

type TaskAccordionProps = {
  task: TaskData;
};

export const TaskAccordion = ({ task }: TaskAccordionProps) => {
  const [taskScore, setTaskScore] = React.useState<TaskScoreData>();

  React.useEffect(() => {
    getTaskScore(task.task_id).then((res) => {
      if (res.data) {
        setTaskScore(res.data.data);
        console.log(res.data.data);
      }
    });
  }, []);

  return (
    <div className="mb-4">
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "black",
            paddingY: "0.5rem",
            paddingX: "1rem",
            backgroundColor: "var(--theme-yellow)",
            borderRadius: "0.125rem",
          }}
        >
          <h2>{task.title}</h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className="my-4 flex flex-col gap-2">
            <p>
              <TimerOutlinedIcon /> Deadline submission: {task.deadline}
            </p>
            {/* <p>
                <SchoolOutlinedIcon /> 张老师
               </p> */}
            <p>
              <EventNoteOutlinedIcon /> {task.class_name}
            </p>
          </div>

          <div>
            <h2 className="text-xl mb-2 font-bold"> • {task.task_type}</h2>
            <div className="text-black p-4 border-2 bg-theme-cream rounded-lg">
              <p className="mb-2">{task.instruction}</p>

              <Link target="none" href={task.task_link}>
                <Button sx={{ background: "black" }} variant="contained">
                  Attachment
                </Button>
              </Link>
            </div>
          </div>

          <Divider
            style={{ margin: "20px -16px" }}
            sx={{ borderBottomWidth: 2 }}
          />

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full">
              <h2 className="text-xl mb-2 font-bold"> • Homework Submission</h2>
              <TextField
                id="outlined-basic"
                label="description"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                sx={{ marginBottom: "1rem" }}
              />
              <div className="max-w-max text-black px-10 py-8 border-2 bg-theme-cream rounded-lg">
                <Button variant="contained" color="primary">
                  Upload Here
                </Button>
                <p className="text-xs mt-2">*Maximum size 5mb</p>
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl mb-2 font-bold">• Homework Feedback</h2>

              {taskScore?.score.map((score) => {
                return (
                  <p key={score.aspect} className="mb-1">
                    {score.aspect} :{" "}
                    <span className="font-bold">{score.score}/100</span>
                  </p>
                );
              })}

              <div className="text-black p-4 border-2 bg-theme-cream rounded-lg mb-4">
                <p className="mb-2">{taskScore?.feedback.feedback_text}</p>
                {taskScore?.feedback.attachment_url && (
                  <Link target="none" href={taskScore?.feedback.attachment_url}>
                    <Button sx={{ background: "black" }} variant="contained">
                      Attachment
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
