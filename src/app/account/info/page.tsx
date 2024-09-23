"use client";

import Layout from "@/components/layout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ProfileData, getProfile, postProfile } from "@/client/student";
import { Controller, useForm } from "react-hook-form";
import { FormControl, MenuItem, Select } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileFormSchema } from "./schema";
import toast from "react-hot-toast";

const InfoPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
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

  React.useEffect(() => {
    getProfile().then((res) => {
      if (res.data.data) {
        reset(res.data.data);
      }
    });
  }, []);

  const onSubmit = handleSubmit((data) => {
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
      .catch(() => {
        toast.error("Failed to update data");
      });
  });

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
          {watch("profile_picture_url") && (
            <Image
              src={watch("profile_picture_url") ?? ""}
              alt="Display Picture"
              width={200}
              height={200}
              className="rounded-xl"
            />
          )}
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
            name="student_id"
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                variant="outlined"
                error={errors.student_id != null}
                helperText={errors.student_id?.message ?? ""}
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
          <Button onClick={onSubmit} className="px-6" variant="contained">
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InfoPage;
