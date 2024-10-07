"use client";

import {
  CreateTaskPayload,
  TaskData,
  UploadFileData,
  createTask,
  editTask,
  getTasks,
  uploadFile,
} from "@/client/teacher";
import Layout from "@/components/layout";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import { ACCEPT_FILE, MODAL_STYLE, TEACHER_URL } from "@/libs/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { taskFormSchema } from "./schema";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

type TaskProps = {
  params: { id: string };
};

const TaskPage = ({ params }: TaskProps) => {
  const [listTask, setListTask] = React.useState<TaskData[]>([]);
  const [open, setOpen] = React.useState(false);
  const fetchTasks = () => {
    getTasks(params.id).then((res) => {
      if (res.data) {
        setListTask(res.data.data);
      }
    });
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const [file, setFile] = React.useState<File | null>(null);
  const [fileUrl, setFileUrl] = React.useState<UploadFileData | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation();

  //Edit data
  const [taskId, setTaskId] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const DEFAULT_FORM_VALUE = {
    lesson_id: params.id,
    task_type: "HOMEWORK",
    title: "",
    instruction: "",
    visible: 1,
    deadline: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: DEFAULT_FORM_VALUE,
    resolver: yupResolver(taskFormSchema),
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    reset(DEFAULT_FORM_VALUE);
    setFile(null);

    setTaskId("");
    setFileUrl(null);
    setOpen(false);
    setIsEdit(false);
  };

  const doEditTask = (fileRes: UploadFileData) => {
    editTask(
      {
        title: getValues("title"),
        task_type: getValues("task_type") ?? "HOMEWORK",
        instruction: getValues("instruction"),
        deadline: getValues("deadline"),
        task_link: fileRes.url,
        meta: fileRes.type,
        visible: getValues("visible") ?? 0,
      },
      taskId
    )
      .then(() => {
        toast.success(t("common.success_submit"));
        fetchTasks();
        handleClose();
      })
      .catch(() => {
        toast.error(t("common.fail_submit"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmitTask = handleSubmit(async (data) => {
    setIsLoading(true);

    if (!file && fileUrl) {
      doEditTask(fileUrl);
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append("fileToUpload", file);
      const uploadRes = await uploadFile(formData);

      if (uploadRes.data) {
        const fileRes: UploadFileData = uploadRes.data.data;

        if (isEdit) {
          doEditTask(fileRes);
          return;
        }

        const taskPayload: CreateTaskPayload = {
          lesson_id: params.id,
          task_type: data.task_type ?? "HOMEWORK",
          title: data.title,
          instruction: data.instruction,
          visible: data.visible ?? 1,
          deadline: data.deadline,
          link: fileRes.url,
        };

        createTask(taskPayload)
          .then(() => {
            toast.success(t("common.success_submit"));
            fetchTasks();
            handleClose();
          })
          .catch((res) => {
            toast.error(res.data.message ?? t("common.fail_submit"));
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        toast.error(uploadRes.data.message ?? t("common.fail_submit"));
        setIsLoading(false);
      }
    }
  });

  const onSelectTask = (data: TaskData) => {
    setTaskId(data.task_id);
    setFileUrl({
      url: data.task_link,
      type: data.meta,
    });
    reset({
      task_type: data.task_type,
      title: data.title,
      instruction: data.instruction,
      visible: data.visible,
      deadline: data.deadline,
    });
    setIsEdit(true);
    handleOpen();
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl my-6">{t("task.class")}</h1>
        <Button
          sx={{
            background: "black",
            height: "40px",
          }}
          variant="contained"
          onClick={handleOpen}
        >
          {t("common.create")} +
        </Button>
      </div>
      <div className="space-y-4">
        {listTask.length > 0 ? (
          listTask.map((task) => {
            return (
              <div key={task.task_id}>
                <Accordion
                  expanded={expanded}
                  onClick={() => {
                    setExpanded(false);
                  }}
                >
                  <AccordionSummary
                    sx={{
                      textAlign: "left",
                      textTransform: "none",
                      whiteSpace: "normal", // Allows the text to break
                      wordBreak: "break-word", // Breaks words that are too long for one line
                    }}
                  >
                    <div className="flex gap-4 justify-between w-full">
                      <p>{task.title}</p>
                      <div className="space-x-2">
                        <Button
                          sx={{
                            background: "black",
                            height: "40px",
                            width: "100px",
                          }}
                          variant="contained"
                          onClick={() => {
                            onSelectTask(task);
                          }}
                        >
                          {t("common.detail")}
                        </Button>

                        <Link
                          href={`${TEACHER_URL.SUBMISSION}/${task.task_id}`}
                        >
                          <Button
                            sx={{
                              background: "black",
                              height: "40px",
                              width: "140px",
                            }}
                            variant="contained"
                          >
                            {t("task.submission")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </AccordionSummary>
                </Accordion>
              </div>
            );
          })
        ) : (
          <p>{t("common.no_data")}</p>
        )}
      </div>

      <Modal
        style={{ overflowY: "scroll", maxHeight: "100vh" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODAL_STYLE}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 4, right: 4 }}
          >
            <Close />
          </IconButton>
          <div className="flex flex-col gap-4 ">
            <InputLabel id="demo-simple-select-label">
              {t("task.type")}
            </InputLabel>
            <Controller
              control={control}
              name="task_type"
              render={({ field }) => (
                <Select
                  value={field.value}
                  defaultValue="HOMEWORK"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                >
                  <MenuItem value={"HOMEWORK"}>{t("task.homework")}</MenuItem>
                  <MenuItem value={"EXAM"}>{t("task.exam")}</MenuItem>
                </Select>
              )}
            />

            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextField
                  label={t("common.title")}
                  id="outlined-basic"
                  variant="outlined"
                  error={!!errors.title}
                  helperText={
                    errors.title?.message ? t(errors.title?.message) : ""
                  }
                  {...field}
                  fullWidth
                />
              )}
            />

            <Controller
              control={control}
              name="instruction"
              render={({ field }) => (
                <TextField
                  label={t("task.instruction")}
                  id="outlined-basic"
                  variant="outlined"
                  error={!!errors.instruction}
                  helperText={
                    errors.instruction?.message
                      ? t(errors.instruction?.message)
                      : ""
                  }
                  {...field}
                  fullWidth
                />
              )}
            />

            <FormControlLabel
              control={
                <Controller
                  control={control}
                  name="visible"
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value === 1}
                      onChange={(e) => {
                        field.onChange(e.target.checked ? 1 : 0);
                      }}
                    />
                  )}
                />
              }
              label={t("task.visible")}
            />

            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel id="demo-simple-select-label">
                    {t("task.deadline")}
                  </InputLabel>
                  <DateTimePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) => {
                      field.onChange(
                        newValue ? newValue.format("YYYY-MM-DD HH:mm:ss") : null
                      );
                    }}
                  />
                </LocalizationProvider>
              )}
            />
            <p style={{ color: "#d32f2f" }}>
              {errors.deadline?.message ? t(errors.deadline?.message) : ""}
            </p>

            <FilePicker
              accept={ACCEPT_FILE}
              multiple={false}
              maxSize={20 * MB_UNIT}
              onFilesSubmit={(files) => {
                if (files.length > 0) {
                  setFile(files[0]);
                }
              }}
            />

            <div>
              {file?.name ? (
                <p>{file.name}</p>
              ) : (
                fileUrl && (
                  <Link target="none" href={fileUrl.url}>
                    <Button
                      sx={{
                        textDecoration: "underline",
                        textAlign: "left",
                        textTransform: "none",
                        whiteSpace: "normal", // Allows the text to break
                        wordBreak: "break-word", // Breaks words that are too long for one line
                      }}
                      variant="text"
                    >
                      {fileUrl.url}
                    </Button>
                  </Link>
                )
              )}
            </div>
            <Button
              onClick={onSubmitTask}
              className="px-6"
              variant="contained"
              disabled={(file === null && !fileUrl?.url) || isLoading}
            >
              {t("common.submit")}
            </Button>
          </div>
        </Box>
      </Modal>
    </Layout>
  );
};

export default TaskPage;
