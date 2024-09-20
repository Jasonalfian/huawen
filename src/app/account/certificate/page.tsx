import Layout from "@/components/layout";
import Link from "next/link";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Certificate = () => {
  return (
    <Layout>
      <div className="text-2xl font-medium text-black p-4 border-2 bg-theme-yellow rounded-lg">
        <h1>My Certificate </h1>
      </div>

      <div className="my-8 flex flex-col gap-1">
        <p className="text-xl font-bold">Congratulations!</p>
        <p>
          You are one step ahead of a brighter future with your mandarin skill.
          Here are your certificate for graduating our course.
        </p>
      </div>

      <div>
        <PictureAsPdfIcon sx={{ fontSize: 80 }} />
      </div>
    </Layout>
  );
};

export default Certificate;
