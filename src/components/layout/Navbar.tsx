import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import RightBar from "../shared/RightBar";
import useGlobalStore from "@/libs/global";
import {
  ROLE_STUDENT,
  ROLE_TEACHER,
  ROOT,
  STUDENT_URL,
  TEACHER_URL,
} from "@/libs/constant";
import { useTranslation } from "react-i18next";

type MenuItemProps = {
  route: string;
  name: string;
};

type NavbarProps = {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  isLandingPage?: boolean;
};

export default function Navbar({ show, setter, isLandingPage }: NavbarProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isStudentPage = pathname.includes(ROLE_STUDENT.toLowerCase());
  const isTeacherPage = pathname.includes(ROLE_TEACHER.toLowerCase());

  // Define our base class
  const className = `
    mt-0 md:mt-[var(--header-height)]
    bg-white
    w-[250px]
    fixed // Fixed position for the sidebar
    top-0
    left-0
    bottom-0 // Make sure it goes to the bottom
    z-40
    border-r-2
    overflow-y-auto // Allows scrolling within the sidebar if needed
    transition-[margin-left]
    ease-in-out duration-500
  `;
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({ name, route }: MenuItemProps) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      pathname === route ? "text-black" : "text-black/50 hover:text-black";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md py-3 border-b-2 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]"></div>
        <div>{t(name)}</div>
      </Link>
    );
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  const { loginData, profilePicUrl } = useGlobalStore();

  return (
    <div className="flex">
      <nav className="justify-between invisible md:visible z-50 fixed top-0 left-0 right-0 h-[var(--header-height)] bg-white flex [&>*]:my-auto px-6 border-b-2">
        <Link
          href={
            isLandingPage
              ? ROOT
              : isStudentPage
              ? STUDENT_URL.HOME
              : TEACHER_URL.HOME
          }
        >
          <Image
            src="/img/huawen-logo.webp"
            alt="Company Logo"
            width={120}
            height={120}
            priority
            style={{ height: "auto", width: "auto", background: "white" }}
          />
        </Link>
        <RightBar hideAccount={isLandingPage} />
      </nav>
      {!isLandingPage && (
        <div className={`${className}${appendClass}`}>
          {isStudentPage && (
            <>
              <Link href={STUDENT_URL.PROFILE}>
                <div className="flex flex-col justify-center items-center my-4 border-B-2">
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={
                        profilePicUrl
                          ? profilePicUrl
                          : "/img/blank-profile.jpeg"
                      }
                      alt="Display Picture"
                      style={{
                        objectFit: "cover",
                        borderRadius: "12px",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        padding: "8px",
                      }}
                    />
                  </div>

                  <p className="mt-2 font-medium">{loginData?.name ?? "-"}</p>
                </div>
              </Link>
              <div className="flex flex-col">
                <MenuItem name="navbar.home" route={STUDENT_URL.HOME} />
                <MenuItem
                  name="navbar.student.announcement"
                  route={STUDENT_URL.ANNOUNCEMENT}
                />
              </div>
            </>
          )}

          {isTeacherPage && (
            <div className="flex flex-col">
              <MenuItem name="navbar.home" route={TEACHER_URL.HOME} />
              <MenuItem
                name="navbar.ungraded_task"
                route={TEACHER_URL.UNGRADED_TASK}
              />
            </div>
          )}
        </div>
      )}
      {show && !isLandingPage ? <ModalOverlay /> : <></>}
    </div>
  );
}
