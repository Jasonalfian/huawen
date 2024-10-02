"use client";

import Layout from "@/components/layout";
import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import LessonInfo from "@/components/shared/LessonInfo";
import Link from "next/link";
import {
  LessonData,
  MaterialData,
  getLesson,
  getMaterials,
} from "@/client/student";
import Button from "@mui/material/Button";
import { STUDENT_URL } from "@/libs/constant";

type MaterialProps = {
  params: { id: string };
};

export default function Material({ params }: MaterialProps) {
  const [listMaterial, setListMaterial] = React.useState<MaterialData[]>([]);
  const [lesson, setLesson] = React.useState<LessonData | undefined>();

  React.useEffect(() => {
    getMaterials(params.id).then((res) => {
      if (res.data) {
        setListMaterial(res.data.data);
      }
    });

    getLesson(params.id).then((res) => {
      if (res.data) {
        const lessonData: LessonData[] = res.data.data;
        setLesson(lessonData[0]);
      }
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl mt-6">
        <Link href={STUDENT_URL.HOME}>
          <ArrowBackOutlinedIcon fontSize="large" />
        </Link>
        Class Materials
      </h1>

      <div className="my-8 flex flex-col gap-1">
        <LessonInfo data={lesson} />
      </div>

      <div>
        <h2 className="text-xl mb-2 font-bold"> • Class Materials</h2>
        <div className="flex flex-col max-w-max gap-2">
          {listMaterial.length > 0 ? (
            listMaterial.map((material) => {
              return (
                <Link
                  target="none"
                  key={material.material_id}
                  href={material.link}
                >
                  <Button sx={{ background: "black" }} variant="contained">
                    {material.description}
                  </Button>
                </Link>
              );
            })
          ) : (
            <p>No Material found</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
