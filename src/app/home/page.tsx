import Layout from "@/components/layout";
import LessonCard from "@/components/lesson/LessonCard";
import React from "react";

export default function HomePage() {
  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <div className="flex text-black items-center p-2 justify-between h-10 w-60 border-2 border-theme-yellow rounded-lg">
          <p>Attendance</p>
          <p>8/20</p>
        </div>
        <div className="flex text-black items-center p-2 justify-between h-10 w-60 border-2 border-theme-yellow  rounded-lg">
          <p>Schedule/Lessons</p>
          <p>33</p>
        </div>
      </div>
      <h1 className="text-4xl mt-6 mb-4">Lessons</h1>

      <div className="flex flex-col gap-4">
        <LessonCard />
        <LessonCard />
      </div>
    </Layout>
  );
}
