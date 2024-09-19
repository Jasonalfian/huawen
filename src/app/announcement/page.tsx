import Layout from "@/components/layout";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function HomePage() {
  return (
    <Layout>
      <div style={{ height: "calc(100vh - var(--header-height) - 48px)" }}>
        <h1 className="text-4xl my-6">List of Announcement</h1>
        <div className="flex flex-col gap-4">
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <h2> 25 December 2024: Hari Natal </h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>Selamat menunaikan ibadah bagi yang merayakan</p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <h2> 16 September 2024: Hari Raya Idul Fitri </h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>Tidak ada kelas untuk 1 minggu</p>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-theme-red">
          <p className="text-sm text-white text-center p-4">
            * National public holiday will be considered as a holiday for all
            classes in Huawen.The class wil be adjusted ot another date (a day
            after before).
          </p>
        </div>
      </div>
    </Layout>
  );
}
