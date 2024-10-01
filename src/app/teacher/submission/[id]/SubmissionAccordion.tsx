import {
  GradeSubmissionPayload,
  Score,
  SubmssionData,
  UploadFileData,
  gradeSubmission,
  uploadFile,
} from "@/client/teacher";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import { ACCEPT_FILE } from "@/libs/constant";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  InputLabel,
  Link,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type SubmissionAccordionProps = {
  submission: SubmssionData;
};

type FormData = {
  feedback_text: string;
  attachment_url: string;
  listening: string;
  reading: string;
  writing: string;
  comprehension: string;
  speaking: string;
  pattern: string;
};

const SubmissionAccordion = ({ submission }: SubmissionAccordionProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const findScore = (key: string) => {
    const scores: Score[] = submission.scores ?? [];
    return scores.find((item) => item.aspect === key)?.score ?? "";
  };
  const getDefaultFormValue = () => {
    return {
      feedback_text: submission.feedback_text,
      attachment_url: submission.feedback_attachment_url,
      listening: findScore("listening"),
      reading: findScore("reading"),
      writing: findScore("writing"),
      comprehension: findScore("comprehension"),
      speaking: findScore("speaking"),
      pattern: findScore("pattern"),
    };
  };

  const { control, getValues, watch, setValue } = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: getDefaultFormValue(),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    const { feedback_text, attachment_url, ...scoresData } = getValues();
    const scoreKeys: Array<keyof typeof scoresData> = [
      "listening",
      "reading",
      "writing",
      "comprehension",
      "speaking",
      "pattern",
    ];

    const scores = scoreKeys.map((aspect) => ({
      aspect: aspect,
      score: scoresData[aspect],
    }));

    let attachmentUrl = attachment_url;

    if (file) {
      const formData = new FormData();
      formData.append("fileToUpload", file);
      const uploadRes = await uploadFile(formData);

      if (uploadRes.data) {
        const fileRes: UploadFileData = uploadRes.data.data;
        attachmentUrl = fileRes.url;
      }
    }

    const data: GradeSubmissionPayload[] = [
      {
        student_id: submission.student_id,
        feedback_text: feedback_text,
        attachment_url: attachmentUrl,
        scores,
      },
    ];

    gradeSubmission(submission.task_id, data)
      .then(() => {
        toast.success("Grade submitted");
        setFile(null);
        setValue("attachment_url", attachmentUrl);
      })
      .catch((res) => {
        toast.error(res.response.data.message ?? "Failed submit grade");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div key={submission.student_id}>
      <Accordion>
        <AccordionSummary
          sx={{
            fontWeight: 500,
            color: "black",
          }}
        >
          <h2>{submission.student_name}</h2>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <p>Created at: {submission.submission_created_at}</p>
            <p>Updated at: {submission.submission_updated_at}</p>
            <p className="mt-2">
              Description: {submission.submission_description ?? "-"}
            </p>
            <p>File Url:</p>

            {submission.file_url &&
              submission.file_url.split(";").map((url) => {
                return (
                  <p
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    <Link href={url}>{url}</Link>
                  </p>
                );
              })}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-medium mb-4">Score</h2>
            <Controller
              control={control}
              name="feedback_text"
              render={({ field }) => (
                <TextField
                  className="mb-2"
                  multiline
                  rows={2}
                  fullWidth
                  label="Feedback"
                  {...field}
                />
              )}
            />

            <div className="flex mt-2 gap-2">
              <div className="w-[50%] space-y-4">
                <Controller
                  control={control}
                  name="listening"
                  render={({ field }) => (
                    <TextField
                      type="number"
                      fullWidth
                      label="Listening"
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="reading"
                  render={({ field }) => (
                    <TextField
                      type="number"
                      fullWidth
                      label="Reading"
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="writing"
                  render={({ field }) => (
                    <TextField
                      type="number"
                      fullWidth
                      label="Writing"
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="comprehension"
                  render={({ field }) => (
                    <TextField
                      type="number"
                      fullWidth
                      label="Comprehension"
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="speaking"
                  render={({ field }) => (
                    <TextField
                      type="number"
                      fullWidth
                      label="Speaking"
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="pattern"
                  render={({ field }) => (
                    <TextField
                      type="number"
                      fullWidth
                      label="Sentence pattern"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="w-[50%] space-y-2">
                <h1>Total Score: </h1>

                <InputLabel>Feedback File</InputLabel>
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
                    watch("attachment_url") && (
                      <Link target="none" href={watch("attachment_url")}>
                        <Button
                          sx={{
                            textDecoration: "underline",
                            textAlign: "left",
                            textTransform: "none",
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                          }}
                          variant="text"
                        >
                          {watch("attachment_url")}
                        </Button>
                      </Link>
                    )
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    className="px-6"
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                    }}
                    onClick={onSubmit}
                    disabled={isLoading}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SubmissionAccordion;
