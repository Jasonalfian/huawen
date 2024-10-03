import {
  GradeSubmissionPayload,
  SubmssionData,
  UploadFileData,
  gradeSubmission,
  uploadFile,
} from "@/client/teacher";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import { ACCEPT_FILE } from "@/libs/constant";
import { yupResolver } from "@hookform/resolvers/yup";
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
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

type HomeworkAccordionProps = {
  submission: SubmssionData;
  fetchSubmissions: () => void;
};

// Define the types for the form data
interface Score {
  aspect?: string;
  score?: number | null;
}

interface FormValues {
  feedback_text?: string | null;
  feedback_attachment_url?: string | null;
  scores?: Score[];
}

// Validation schema with Yup
const schema = yup.object().shape({
  feedback_text: yup.string().nullable(),
  feedback_attachment_url: yup.string().nullable(),
  scores: yup.array().of(
    yup.object().shape({
      aspect: yup.string(),
      score: yup
        .number()
        .transform((value, originalValue) => {
          return originalValue === "" ? null : value;
        })
        .typeError("Score must be a number")
        .min(1, "Score must be at least 1")
        .max(100, "Score cannot be more than 100")
        .nullable(),
    })
  ),
});

const defaultAspects = ["score"];

const HomeworkAccordion = ({
  submission,
  fetchSubmissions,
}: HomeworkAccordionProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Combine default aspects and scores from the backend
  const mergedScores = defaultAspects.map((aspect) => {
    const foundScore = submission.scores.find(
      (score) => score.aspect === aspect
    );
    return {
      aspect,
      score: foundScore ? Number(foundScore.score) : null, // If not found, default to score 0
    };
  });

  // Add custom aspects that are not part of the default aspects
  const customAspects = submission.scores.filter(
    (score) => !defaultAspects.includes(score.aspect ?? "")
  );

  // Combine mandatory aspects and custom aspects
  const initialSortedAspects = [...mergedScores, ...customAspects];

  // Track sorted aspects in state
  const [sortedAspects, setSortedAspects] =
    React.useState(initialSortedAspects);

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      feedback_text: submission.feedback_text,
      feedback_attachment_url: submission.feedback_attachment_url,
      scores: sortedAspects.map((score) => ({
        aspect: score.aspect,
        score: score.score,
      })),
    },
  });

  const [scores, setScores] = React.useState(
    defaultAspects.map((aspect) => ({ aspect, score: "" }))
  );

  // Define the submit handler with proper typing
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Submitted data:", data);

    setIsLoading(true);
    let attachmentUrl = data.feedback_attachment_url;

    if (file) {
      const formData = new FormData();
      formData.append("fileToUpload", file);
      const uploadRes = await uploadFile(formData);

      if (uploadRes.data) {
        const fileRes: UploadFileData = uploadRes.data.data;
        attachmentUrl = fileRes.url;
      }
    }

    const submitPayload: GradeSubmissionPayload[] = [
      {
        student_id: submission.student_id,
        feedback_text: data.feedback_text ?? "",
        attachment_url: attachmentUrl ?? "",
        scores: data.scores ?? [],
      },
    ];

    gradeSubmission(submission.task_id, submitPayload)
      .then(() => {
        toast.success("Grade submitted");
        setFile(null);
        fetchSubmissions();
      })
      .catch((res) => {
        toast.error(res.response.data.message ?? "Failed submit grade");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Define the error handler with proper typing
  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    toast.error("Please fix the errors");
  };

  const calculateAverageScore = () => {
    const validScores = watch("scores")
      ?.map((scoreObj) => scoreObj.score)
      .filter((score) => score ?? 0 > 0); // Filter out null or 0 scores

    if (validScores && validScores.length > 0) {
      let sum = 0;
      validScores.map((score) => {
        sum = sum + Number(score);
      });
      const average = sum / validScores.length;
      return average.toFixed(2);
    }
    return "-";
  };

  return (
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
            submission.file_url.split(";").map((url, index) => {
              return (
                <p
                  key={`url-${index}`}
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
                value={field.value ?? ""}
              />
            )}
          />

          <div className="flex mt-2 gap-4">
            <div className="w-[50%] space-y-4">
              {sortedAspects.map((aspect, index) => (
                <div className="flex" key={index}>
                  <Controller
                    name={`scores.${index}.score`}
                    control={control}
                    defaultValue={Number(scores[index]?.score) || 0}
                    render={({ field }) => (
                      <>
                        <TextField
                          label={aspect.aspect}
                          type="number"
                          fullWidth
                          {...field}
                          error={errors?.scores?.[index]?.score != null}
                          helperText={
                            errors?.scores?.[index]?.score?.message ?? ""
                          }
                        />
                      </>
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="w-[50%] space-y-2">
              <h1>Final Score: {calculateAverageScore()}</h1>

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
                  watch("feedback_attachment_url") && (
                    <Link
                      target="none"
                      href={watch("feedback_attachment_url") ?? ""}
                    >
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
                        {watch("feedback_attachment_url")}
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
                  onClick={handleSubmit(onSubmit, onError)}
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
  );
};

export default HomeworkAccordion;
