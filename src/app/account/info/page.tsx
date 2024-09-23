"use client";

import Layout from "@/components/layout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { ProfileData, getProfile } from "@/client/student";

const InfoPage = () => {
  const [profile, setProfile] = React.useState<ProfileData>();

  React.useEffect(() => {
    getProfile().then((res) => {
      if (res.data.data) {
        setProfile(res.data.data);
      }
    });
  }, []);

  const [value, setValue] = React.useState<Dayjs | null>(null);

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
          <Image
            src={profile?.profile_picture_url ?? ""}
            alt="Display Picture"
            width={200}
            height={200}
            className="rounded-xl"
          />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%]">
            <p>Nama </p>
          </div>
          <TextField fullWidth id="standard-basic" variant="outlined" />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%]">
            <p>Age </p>
          </div>
          <TextField fullWidth id="standard-basic" variant="outlined" />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%]">
            <p>Phone Number </p>
          </div>
          <TextField fullWidth id="standard-basic" variant="outlined" />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[30%]">
            <p>Education/Job</p>
          </div>
          <TextField fullWidth id="standard-basic" variant="outlined" />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="mb-3 w-full md:w-[23%]">
            <p>Since when did you learn chinese?</p>
          </div>
          {/* <TextField fullWidth id="standard-basic" variant="outlined" /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year"]}
              label="Year only"
              value={value}
              onChange={setValue}
            />
          </LocalizationProvider>
        </div>

        <div className="flex justify-end">
          <Button className="px-6" variant="contained">
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InfoPage;
