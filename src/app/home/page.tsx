import { cn } from "@/utils/utils";

const Home = () => {
  return (
    <>
      <header
        style={{ height: "var(--header-height)" }}
        className={cn(
          "flex w-full justify-between bg-gradient-to-r from-canvas-primary from-40% to-100% p-4"
        )}
      ></header>
      <main
        className="flex w-full border-t-2"
        style={{
          height: "calc(100vh - var(--header-height))", // Marquee is shown on all page using UserLayout
        }}
      >
        <aside
          className={cn(
            "w-48 border-r-2 border-canvas-hover border-r-canvas-secondary",
            "bg-canvas-primary [&>ul]:w-full [&>ul]:flex-col"
          )}
        >
          <ul>
            <li key="a">Test1</li>
            <li key="b">Test2</li>
            <li key="c">Test3</li>
          </ul>
        </aside>
        <div className="flex flex-col items-center justify-center p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <h1>Masuk nih</h1>
        </div>
      </main>
    </>
  );
};

export default Home;
