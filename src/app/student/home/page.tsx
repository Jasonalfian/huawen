"use client";

import { LessonData, getLessons } from "@/client/student";
import Layout from "@/components/layout";
import LessonCard from "@/components/lesson/student/LessonCard";
import React from "react";

export default function HomePage() {
  const [listLesson, setListLesson] = React.useState<LessonData[]>([]);
  const [totalAttend, setTotalAttend] = React.useState(0);

  React.useEffect(() => {
    getLessons().then((res) => {
      if (res.data) {
        const lessonData: LessonData[] = res.data.data;
        let totalAttend = 0;

        lessonData.forEach((lesson) => {
          if (lesson.attendance == 1) {
            totalAttend += 1;
          }
        });

        setTotalAttend(totalAttend);
        setListLesson(lessonData);
      }
    });
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <div className="flex text-black items-center p-2 justify-between h-10 w-60 border-2 border-theme-yellow rounded-lg">
          <p>Attendance</p>
          <p>
            {totalAttend}/{listLesson.filter((lessonData) => {return new Date(lessonData.start_time) < new Date()}).length}
          </p>
        </div>
        <div className="flex text-black items-center p-2 justify-between h-10 w-60 border-2 border-theme-yellow  rounded-lg">
          <p>Schedule/Lessons</p>
          <p>{listLesson.length}</p>
        </div>
      </div>
      <h1 className="text-4xl mt-6 mb-4">Lessons</h1>

      <div className="flex flex-col gap-4">
        {listLesson.map((lesson, index) => {
          return (
            <LessonCard data={lesson} key={`${lesson.lesson_id}-${index}`} />
          );
        })}
      </div>
    </Layout>
  );
}
