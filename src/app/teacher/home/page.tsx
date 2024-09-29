"use client";

import { getLessons, LessonData } from "@/client/teacher";
import Layout from "@/components/layout";
import LessonCard from "@/components/lesson/teacher/LessonCard";
import React from "react";

const Home = () => {
  const [listLesson, setListLesson] = React.useState<LessonData[]>([]);

  React.useEffect(() => {
    getLessons().then((res) => {
      if (res.data) {
        setListLesson(res.data.data);
      }
    });
  }, []);

  return (
    <Layout>
      <div className="space-y-4">
        {listLesson.map((lesson) => {
          return <LessonCard data={lesson} />;
        })}
      </div>
    </Layout>
  );
};

export default Home;
