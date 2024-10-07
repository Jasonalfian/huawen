"use client";

import {
  AttendanceData,
  AttendancePayload,
  UploadFileData,
  updateStudentAttendance,
  uploadFile,
} from "@/client/teacher";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import { ACCPET_FILE_EVALUATION, MODAL_STYLE } from "@/libs/constant";
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
import toast from "react-hot-toast";
import Image from "next/image";
import { useTranslation } from "react-i18next";

type AttendanceProps = {
  attendance: AttendanceData;
  refetchData: () => void;
};

const AttendanceBox = ({ attendance, refetchData }: AttendanceProps) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (isTicked: number, file?: File) => {
    setIsLoading(true);
    let evaluationUrl = attendance.evaluation;

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
        attendance: isTicked,
        evaluation: evaluationUrl,
      },
    ];

    updateStudentAttendance(attendance.lesson_id, data)
      .then(() => {
        toast.success(t("common.success_submit"));
        refetchData();
        handleClose();
      })
      .catch((res) => {
        toast.error(res.response.data.message ?? t("common.fail_submit"));
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
              accept={ACCPET_FILE_EVALUATION}
              multiple={false}
              maxSize={20 * MB_UNIT}
              onFilesSubmit={(files) => {
                if (files.length > 0) {
                  onSubmit(attendance.attendance, files[0]);
                }
              }}
            />
          </div>
        </Box>
      </Modal>
      <p className="text-xl font-medium mb-4">{attendance.name}</p>
      <div
        style={{
          width: "200px",
          height: "200px",
          position: "relative",
        }}
      >
        <Image
          src={
            attendance.profile_picture_url
              ? attendance.profile_picture_url
              : "/img/blank-profile.jpeg"
          }
          alt="Display Picture"
          fill
          style={{ objectFit: "cover", borderRadius: "12px" }}
          className="border-2"
        />
      </div>

      <div className="space-x-2 mt-4">
        <FormControlLabel
          control={
            <Checkbox
              checked={attendance.attendance === 1}
              disabled={isLoading}
              onChange={(e) => {
                onSubmit(e.target.checked ? 1 : 0);
              }}
            />
          }
          label={t("common.attend")}
        />

        <Button
          sx={{ color: "black", borderColor: "black" }}
          variant="outlined"
          onClick={handleOpen}
        >
          {t("common.evaluation")}
        </Button>
      </div>

      <div
        style={{
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
        className="mt-4"
      >
        <Link href={attendance.evaluation}>
          <p>{attendance.evaluation}</p>
        </Link>
      </div>
    </div>
  );
};

export default AttendanceBox;
