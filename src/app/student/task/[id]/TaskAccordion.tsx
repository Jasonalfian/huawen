"use client";

import React from "react";
import Divider from "@mui/material/Divider";
import { Button, Chip, TextField } from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import Link from "next/link";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  TaskData,
  TaskScoreData,
  getTaskScore,
  submitTask,
} from "@/client/student";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ACCEPT_FILE } from "@/libs/constant";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { PriorityHigh } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TaskAccordionProps = {
  task: TaskData;
  refetchTask: () => void;
};

export const TaskAccordion = ({ task, refetchTask }: TaskAccordionProps) => {
  const [taskScore, setTaskScore] = React.useState<TaskScoreData>();
  const [files, setFiles] = React.useState<File[]>([]);
  const [submitUrl, setSubmitUrl] = React.useState(task.file_url);
  const [description, setDescription] = React.useState(task.description);
  const [isLoading, setIsLoading] = React.useState(false);

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const deadline = task.deadline; // Assuming this is saved in GMT+7
  const timezoneGMT7 = "Asia/Bangkok"; // Timezone for GMT+7

  // Convert both current date and deadline to GMT+7
  const currentDateInGMT7 = dayjs().tz(timezoneGMT7);
  const deadlineInGMT7 = dayjs(deadline).tz(timezoneGMT7);

  // Check if the current date is before the deadline in GMT+7
  const isBeforeDeadline = currentDateInGMT7.isBefore(deadlineInGMT7);

  React.useEffect(() => {
    getTaskScore(task.task_id).then((res) => {
      if (res.data) {
        setTaskScore(res.data.data);
      }
    });
  }, []);

  const onSubmitTask = () => {
    setIsLoading(true);
    if (files) {
      const formData = new FormData();

      files.forEach((file, index) => {
        formData.append(`fileToUpload${index + 1}`, file);
      });

      formData.append("description", description);
      submitTask(formData, task.task_id)
        .then((res) => {
          if (res.data) {
            setSubmitUrl(res.data.file_url);
            refetchTask();
            toast.success("Submit Task Success");
          }
        })
        .catch((res) => {
          if (res.response.data) {
            toast.error(res.response.data.message ?? "Failed uploading task");
          }
        })
        .finally(() => {
          setFiles([]);
          setIsLoading(false);
        });
    }
  };

  const taskDeadline = dayjs(task.deadline); // Start time

  const labels = taskScore?.score.map((score) => score.aspect) ?? [];
  const datasets = taskScore?.score.map((score) => score.score) ?? [];
  const finalScore = (
    (taskScore?.score.reduce((acc, obj) => acc + Number(obj.score), 0) ?? 0) /
    (taskScore?.score.length ?? 0)
  ).toFixed(2);

  const data = {
    labels: labels,
    datasets: [
      {
        // Title of Graph
        label: "Score",
        data: datasets,
        backgroundColor: ["rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)"],
        borderColor: ["rgb(255, 159, 64)", "rgb(255, 205, 86)"],
        borderWidth: 1,
        barPercentage: 1,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
      },
      // insert similar in dataset object for making multi bar chart
    ],
  };
  const options = {
    indexAxis: "y" as const,
    scales: {
      y: {
        title: {
          display: true,
          // text: "Aspect",
        },
        beginAtZero: true,
        max: 100,
      },
      x: {
        title: {
          display: true,
          // text: "Score",
        },
      },
    },
  };

  return (
    <div className="mb-4">
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            fontSize: "1.2rem",
            fontWeight: 500,
            color: task.submission_created_at ? "black" : "white",
            paddingY: "0.5rem",
            paddingX: "1rem",
            backgroundColor: task.submission_created_at
              ? "var(--theme-cream)"
              : "var(--theme-red)",
            borderRadius: "0.125rem",
          }}
        >
          <h2>
            {task.title} {!task.submission_created_at && <PriorityHigh />}
          </h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className="my-4 flex flex-col gap-2">
            <p>
              <TimerOutlinedIcon /> Deadline submission:{" "}
              {taskDeadline.format("DD MMMM YYYY HH:mm")}
            </p>
            <p>
              <EventNoteOutlinedIcon /> {task.class_name}
            </p>
          </div>

          <div>
            <h2 className="text-xl mb-2 font-bold"> • {task.task_type}</h2>
            <div className="text-black p-4 border-2 bg-theme-cream rounded-lg">
              <p className="mb-2">{task.instruction}</p>

              <Link target="none" href={task.task_link}>
                <Button sx={{ textDecoration: "underline" }} variant="text">
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
              <h2 className="text-xl mb-2 font-bold">
                {" "}
                • {task.task_type} SUBMISSION
              </h2>
              <TextField
                id="outlined-basic"
                label="description"
                variant="outlined"
                value={description}
                multiline
                rows={2}
                fullWidth
                sx={{ marginBottom: "1rem" }}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!isBeforeDeadline}
              />

              {isBeforeDeadline && (
                <div className="className=mt-2">
                  <FilePicker
                    accept={ACCEPT_FILE}
                    multiple={true}
                    max={5}
                    maxSize={20 * MB_UNIT}
                    onFilesSubmit={(files) => {
                      if (files.length > 0) {
                        setFiles(files);
                      }
                    }}
                  />
                </div>
              )}

              <div>
                {files && files.length > 0
                  ? files.map((file) => {
                      return <p>{file.name}</p>;
                    })
                  : submitUrl &&
                    submitUrl.split(";").map((url) => {
                      return (
                        <Link target="none" href={url}>
                          <Button
                            sx={{
                              textDecoration: "underline",
                              textAlign: "left",
                              textTransform: "none",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                            }}
                            variant="text"
                          >
                            {url}
                          </Button>
                        </Link>
                      );
                    })}
              </div>

              {isBeforeDeadline && (
                <div className="flex justify-end">
                  <Button
                    sx={{ marginTop: "12px" }}
                    disabled={files === null || isLoading}
                    variant="contained"
                    onClick={onSubmitTask}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>

            <div className="w-full">
              <h2 className="text-xl mb-2 font-bold">
                • {task.task_type} FEEDBACK
              </h2>

              <div className="text-black p-4 border-2 bg-theme-cream rounded-lg mb-4">
                <p className="mb-2">
                  {taskScore?.feedback.feedback_text ?? "No Feedback yet"}
                </p>
                {taskScore?.feedback.attachment_url && (
                  <Link target="none" href={taskScore?.feedback.attachment_url}>
                    <Button sx={{ textDecoration: "underline" }} variant="text">
                      Attachment
                    </Button>
                  </Link>
                )}
              </div>

              {taskScore?.score && taskScore.score.length > 0 && (
                <div className="w-full flex flex-col items-center">
                  {task.task_type === "EXAM" && (
                    <Bar data={data} options={options} />
                  )}
                  <Chip
                    color="success"
                    sx={{
                      fontSize: "16px",
                    }}
                    label={`Final Score: ${finalScore}`}
                  />
                </div>
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
