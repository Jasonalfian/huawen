"use client";

import {
  editLessonInfo,
  editLessonRecording,
  editLessonZoom,
  getLessons,
  LessonData,
} from "@/client/teacher";
import Layout from "@/components/layout";
import LessonCard from "@/components/lesson/teacher/LessonCard";
import { MODAL_STYLE } from "@/libs/constant";
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

  const handleClose = () => {
    setIsLoading(false);
    setOpen(false);
    reset(DEFAULT_FORM_VALUE);
  };
  const handleOpen = (data: LessonData) => {
    setOpen(true);
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
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: DEFAULT_FORM_VALUE,
    resolver: yupResolver(lessonFormSchema),
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const editLessonRes = await editLessonInfo(data);

    if (data.recording_link) {
      const editZoomRecordingRes = await editLessonRecording(
        data.lesson_id,
        data.recording_link
      );

      if (editZoomRecordingRes.data) {
        toast.success("Success update recording");
        handleClose();
      } else {
        toast.error(
          editLessonRes.data.message ?? "Error in updating recording"
        );
      }
    }
    if (data.zoom_link) {
      const editZoomInfoRes = await editLessonZoom(
        data.lesson_id,
        data.zoom_link
      );

      if (editZoomInfoRes.data) {
        toast.success("Success update zoom link");
        handleClose();
      } else {
        toast.error(
          editLessonRes.data.message ?? "Error in updating zoom link"
        );
      }
    }

    if (editLessonRes.data) {
      toast.success("Success update lesson");
      handleClose();
    } else {
      toast.error("Error in updating lesson");
    }

    fetchLessons();
    handleClose();
  });

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
          <p>No lessons found</p>
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
                    label="Lesson name"
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description?.message ?? ""}
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
                    label="Description"
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description?.message ?? ""}
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
                    Start Time
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
                    End Time
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
                    label="Zoom link"
                    variant="outlined"
                    error={!!errors.zoom_link}
                    helperText={errors.zoom_link?.message ?? ""}
                    {...field}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="recording_link"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Recording link"
                    variant="outlined"
                    error={!!errors.recording_link}
                    helperText={errors.recording_link?.message ?? ""}
                    {...field}
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                disabled={isLoading}
                onClick={onSubmit}
                className="px-6"
                variant="contained"
                sx={{ backgroundColor: "black" }}
              >
                Save
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </Layout>
  );
};

export default Home;
