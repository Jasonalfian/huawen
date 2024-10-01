"use client";

import {
  AttendanceData,
  AttendancePayload,
  UploadFileData,
  updateStudentAttendance,
  uploadFile,
} from "@/client/teacher";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import { MODAL_STYLE } from "@/libs/constant";
import { cn } from "@/utils/utils";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Link,
  Modal,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type AttendanceProps = {
  attendance: AttendanceData;
  refetchData: () => void;
};

const AttendanceBox = ({ attendance, refetchData }: AttendanceProps) => {
  const { control, getValues } = useForm<AttendanceData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: attendance,
  });

  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const formData = getValues();
    let evaluationUrl = formData.evaluation;

    if (file) {
      const formData = new FormData();
      formData.append("fileToUpload", file);
      const uploadRes = await uploadFile(formData);

      if (uploadRes.data) {
        const fileRes: UploadFileData = uploadRes.data.data;
        evaluationUrl = fileRes.url;
      }
    }

    const data: AttendancePayload[] = [
      {
        student_id: attendance.student_id,
        attendance: formData.attendance,
        evaluation: evaluationUrl,
      },
    ];

    updateStudentAttendance(attendance.lesson_id, data)
      .then(() => {
        toast.success("Grade submitted");
        setFile(null);
        refetchData();
      })
      .catch((res) => {
        toast.error(res.response.data.message ?? "Failed submit grade");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className={cn(
        "w-full border-2 h-full rounded-lg p-4",
        {
          "bg-red-50": attendance.attendance !== 1,
        },
        {
          "bg-green-50": attendance.attendance === 1,
        }
      )}
      key={attendance.student_id}
    >
      <Modal
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
            <FilePicker
              accept={"image/gif, image/jpeg, image/png, image/jpg"}
              multiple={false}
              maxSize={0.5 * MB_UNIT}
              onFilesSubmit={(files) => {
                if (files.length > 0) {
                  setFile(files[0]);
                }
              }}
            />
          </div>
        </Box>
      </Modal>
      <p className="text-xl font-medium mb-4">{attendance.name}</p>
      <div className="space-x-2 mt-4">
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="attendance"
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value === 1}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    field.onChange(e.target.checked ? 1 : 0);
                  }}
                />
              )}
            />
          }
          label="Attend"
        />

        <Button
          className="px-6"
          sx={{ color: "black", borderColor: "black" }}
          variant="outlined"
          onClick={handleOpen}
        >
          Evaluation
        </Button>

        <Button
          sx={{ background: "black" }}
          className="px-6"
          variant="contained"
          onClick={onSubmit}
          disabled={isLoading}
        >
          Save
        </Button>
      </div>

      <div
        style={{
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
        className="mt-4"
      >
        {file?.name ? (
          <p>{file.name}</p>
        ) : (
          <Link href={attendance.evaluation}>
            <p>{attendance.evaluation}</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AttendanceBox;
