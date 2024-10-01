"use client";

import Layout from "@/components/layout";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AnnouncementData, getAnnouncements } from "@/client/student";

export default function AnnouncementPage() {
  const [listAnnouncement, setListAnnouncement] = React.useState<
    AnnouncementData[]
  >([]);

  React.useEffect(() => {
    getAnnouncements().then((res) => {
      if (res.data) {
        setListAnnouncement(res.data.data);
      }
    });
  }, []);

  type SingleAnnouncementProps = {
    data: AnnouncementData;
  };

  const SingleAnnouncement = ({ data }: SingleAnnouncementProps) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <h2 className="font-semibold">{data.title}</h2>
        </AccordionSummary>
        <AccordionDetails>
          <p>{data.message}</p>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Layout>
      <div style={{ height: "calc(100vh - var(--header-height) - 48px)" }}>
        <h1 className="text-4xl my-6">List of Announcement</h1>
        <div className="flex flex-col gap-4">
          {listAnnouncement.map((data, index) => {
            return (
              <SingleAnnouncement key={`${data.title}-${index}`} data={data} />
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-theme-red">
          <p className="text-sm text-white text-center p-4">
            * National public holiday will be considered as a holiday for all
            classes in Huawen. The class wil be adjusted to another date (a day
            after or before).
          </p>
        </div>
      </div>
    </Layout>
  );
}
