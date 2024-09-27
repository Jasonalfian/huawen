"use client";

import { getLessons, LessonData } from "@/client/teacher";
import Layout from "@/components/layout";
import LessonCard from "@/components/lesson/teacher/LessonCard";
import useGlobalStore from "@/libs/global";
import React from "react";

const Home = () => {
  const { loginData } = useGlobalStore();

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
      {listLesson.map((lesson) => {
        return <LessonCard data={lesson} />;
      })}
    </Layout>
  );
};

export default Home;
