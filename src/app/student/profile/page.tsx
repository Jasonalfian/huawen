"use client";

import Layout from "@/components/layout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getProfile, postDisplayPicture, postProfile } from "@/client/student";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileFormSchema } from "./schema";
import toast from "react-hot-toast";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import { Close } from "@mui/icons-material";
import useGlobalStore from "@/libs/global";
import { MODAL_STYLE } from "@/libs/constant";

const InfoPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      age: 0,
      created_at: "",
      education_job: "",
      gender: "",
      learning_chinese_since: 0,
      phone_number: "",
      profile_picture_url: "",
      student_id: "",
      updated_at: "",
    },
    resolver: yupResolver(profileFormSchema),
  });

  const [picture, setPicture] = React.useState<File | null>(null);
  const { loginData, updateProfilePic, profilePicUrl } = useGlobalStore();

  React.useEffect(() => {
    getProfile().then((res) => {
      if (res.data.data) {
        reset(res.data.data);
        setValue("name", loginData?.name);
      }
    });
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingPicture, setIsLoadingPicture] = React.useState(false);

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    postProfile({
      gender: data.gender,
      age: data.age,
      phone_number: data.phone_number,
      learning_chinese_since: data.learning_chinese_since,
      education_job: data.education_job,
    })
      .then(() => {
        console.log("masuk");
        toast.success("Profile updated");
      })
      .catch((res) => {
        if (res.response.data) {
          toast.error(res.response.data.message ?? "Failed update");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const onSubmitFile = () => {
    setIsLoadingPicture(true);
    if (picture) {
      const formData = new FormData();
      formData.append("fileToUpload", picture);
      postDisplayPicture(formData)
        .then((res) => {
          if (res.data) {
            const cacheBuster = new Date().getTime();
            updateProfilePic(
              `${res.data.profile_picture_url}?t=${cacheBuster}`
            );
          }
          toast.success("Display picture updated");
          handleClose();
        })
        .catch((res) => {
          if (res.response.data) {
            toast.error(
              res.response.data.message ?? "Failed uploading picture"
            );
          }
          setPicture(null);
        })
        .finally(() => {
          setIsLoadingPicture(false);
        });
    }
  };

  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState<string | null>(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setImage(null);
    setOpen(false);
  };

  return (
    <Layout>
      <div className="text-2xl font-medium text-black p-4 border-2 bg-theme-yellow rounded-lg mb-4">
        <h1>Student Information</h1>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[23%]">
            <p>Display Picture</p>
          </div>
          <div onClick={handleOpen}>
            {profilePicUrl ? (
              <Image
                src={profilePicUrl}
                alt="Display Picture"
                width={350}
                height={350}
                className="rounded-xl"
                style={{ height: "auto", width: "auto" }}
              />
            ) : (
              <Button>Add Image</Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%]">
            <p>Gender</p>
          </div>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%]">
            <p>Name</p>
          </div>

          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                variant="outlined"
                error={errors.name != null}
                helperText={errors.name?.message ?? ""}
                {...field}
                fullWidth
                disabled
              />
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%]">
            <p>Age</p>
          </div>
          <Controller
            control={control}
            name="age"
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                variant="outlined"
                error={errors.age != null}
                helperText={errors.age?.message ?? ""}
                {...field}
                fullWidth
              />
            )}
          ></Controller>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%]">
            <p>Phone Number </p>
          </div>
          <Controller
            control={control}
            name="phone_number"
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                variant="outlined"
                error={errors.phone_number != null}
                helperText={errors.phone_number?.message ?? ""}
                {...field}
                fullWidth
              />
            )}
          ></Controller>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%]">
            <p>Education/Job</p>
          </div>
          <Controller
            control={control}
            name="education_job"
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                variant="outlined"
                error={errors.education_job != null}
                helperText={errors.education_job?.message ?? ""}
                {...field}
                fullWidth
              />
            )}
          ></Controller>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="mb-3 w-full md:w-[23%]">
            <p>Since when did you learn chinese?</p>
          </div>

          <Controller
            name="learning_chinese_since"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  label="Year only"
                  value={field.value ? dayjs().year(field.value) : null}
                  onChange={(newValue) => {
                    field.onChange(newValue ? newValue.year() : null); // Update with the selected year
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            disabled={isLoading}
            onClick={onSubmit}
            className="px-6"
            variant="contained"
          >
            Save
          </Button>
        </div>
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
                    setPicture(files[0]);
                    setImage(URL.createObjectURL(files[0]));
                  }
                }}
              />

              {image && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <Image
                    alt="Profile picture preview"
                    src={image}
                    width={350}
                    height={350}
                    style={{
                      height: "auto",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              <Button
                onClick={onSubmitFile}
                className="px-6"
                variant="contained"
                disabled={picture === null || isLoadingPicture}
              >
                Save Picture
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </Layout>
  );
};

export default InfoPage;
