"use client";

import {
  editLessonInfo,
  editLessonRecording,
  editLessonZoom,
  getLessons,
  LessonData,
  uploadFile,
} from "@/client/teacher";
import Layout from "@/components/layout";
import LessonCard from "@/components/lesson/teacher/LessonCard";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import { ACCEPT_FILE, MODAL_STYLE } from "@/libs/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { lessonFormSchema } from "./schema";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const Home = () => {
  const DEFAULT_FORM_VALUE = {
    lesson_id: "",
    lesson_name: "",
    description: "",
    start_time: "",
    end_time: "",
    zoom_link: "",
    recording_link: "",
  };
  const [listLesson, setListLesson] = React.useState<LessonData[]>([]);
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  const handleClose = () => {
    setIsLoading(false);
    setOpen(false);
    setFile(null);
    reset(DEFAULT_FORM_VALUE);
  };
  const handleOpen = (data: LessonData) => {
    setOpen(true);
    setFile(null);
    reset({
      lesson_id: data.lesson_id,
      lesson_name: data.lesson_name,
      description: data.description,
      start_time: data.start_time,
      end_time: data.end_time,
      zoom_link: data.zoom_link,
      recording_link: data.recording_link,
    });
  };

  const fetchLessons = () => {
    getLessons().then((res) => {
      if (res.data) {
        setListLesson(res.data.data);
      }
    });
  };

  React.useEffect(() => {
    fetchLessons();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: DEFAULT_FORM_VALUE,
    resolver: yupResolver(lessonFormSchema),
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const currentRecordingLink = watch("recording_link");

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    let finalRecordingLink = data.recording_link;

    if (file !== null) {
      try {
        const formData = new FormData();
        formData.append("fileToUpload", file);

        const uploadRes = await uploadFile(formData);
        if (uploadRes.data) {
          finalRecordingLink = uploadRes.data.data.url;
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message ?? t("common.fail_submit"));
        setIsLoading(false);
        return; // Stop execution if file upload fails
      }
    }

    const editLessonRes = await editLessonInfo(data);

    if (finalRecordingLink) {
      const editZoomRecordingRes = await editLessonRecording(
        data.lesson_id,
        finalRecordingLink
      );

      if (editZoomRecordingRes.data) {
        toast.success(t("common.success_submit"));
        handleClose();
      } else {
        toast.error(editLessonRes.data.message ?? t("common.fail_submit"));
      }
    }

    if (data.zoom_link) {
      const editZoomInfoRes = await editLessonZoom(
        data.lesson_id,
        data.zoom_link
      );

      if (editZoomInfoRes.data) {
        toast.success(t("common.success_submit"));
        handleClose();
      } else {
        toast.error(editLessonRes.data.message ?? t("common.fail_submit"));
      }
    }

    if (editLessonRes.data) {
      toast.success(t("common.success_submit"));
      handleClose();
    } else {
      toast.error(t("common.fail_submit"));
    }

    fetchLessons();
    handleClose();
  });

  const { t } = useTranslation();

  return (
    <Layout>
      <div className="space-y-4">
        {listLesson.length > 0 ? (
          listLesson.map((lesson) => {
            return (
              <LessonCard
                key={lesson.lesson_id}
                handleOpen={() => {
                  handleOpen(lesson);
                }}
                data={lesson}
              />
            );
          })
        ) : (
          <p>{t("common.no_data")}</p>
        )}

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
              <Controller
                name="lesson_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    label={t("lesson.name")}
                    variant="outlined"
                    error={!!errors.lesson_name}
                    helperText={
                      errors.lesson_name?.message
                        ? t(errors.lesson_name.message)
                        : ""
                    }
                    {...field}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    label={t("common.description")}
                    variant="outlined"
                    error={!!errors.description}
                    helperText={
                      errors.description?.message
                        ? t(errors.description.message)
                        : ""
                    }
                    {...field}
                    fullWidth
                    multiline
                    rows={2}
                  />
                )}
              />

              <div className="flex gap-2">
                <div>
                  <InputLabel id="demo-simple-select-label">
                    {t("lesson.start_time")}
                  </InputLabel>

                  <Controller
                    name="start_time"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          disabled
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(newValue) => {
                            field.onChange(
                              newValue
                                ? newValue.format("YYYY-MM-DD HH:mm:ss")
                                : null
                            );
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </div>
                <div>
                  <InputLabel id="demo-simple-select-label">
                    {t("lesson.end_time")}
                  </InputLabel>
                  <Controller
                    name="end_time"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          disabled
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(newValue) => {
                            field.onChange(
                              newValue
                                ? newValue.format("YYYY-MM-DD HH:mm:ss")
                                : null
                            );
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </div>
              </div>

              <Controller
                name="zoom_link"
                control={control}
                render={({ field }) => (
                  <TextField
                    label={t("lesson.zoom_link")}
                    variant="outlined"
                    error={!!errors.zoom_link}
                    helperText={
                      errors.zoom_link?.message
                        ? t(errors.zoom_link.message)
                        : ""
                    }
                    {...field}
                    fullWidth
                  />
                )}
              />

              <div className="flex flex-col gap-2">
                <InputLabel>{t("lesson.recording_link")}</InputLabel>
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
                    currentRecordingLink && (
                      <Link target="_blank" href={currentRecordingLink}>
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
                          {currentRecordingLink}
                        </Button>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                disabled={isLoading}
                onClick={onSubmit}
                className="px-6"
                variant="contained"
                sx={{ backgroundColor: "black" }}
              >
                {t("common.save")}
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </Layout>
  );
};

export default Home;
