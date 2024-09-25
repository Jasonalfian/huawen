import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import RightBar from "../shared/RightBar";
import useGlobalStore from "@/libs/global";
import { STUDENT_URL } from "@/libs/constant";

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
  const pathname = usePathname();

  // Define our base class
  const className =
    "mt-0 md:mt-[var(--header-height)] bg-white w-[250px] transition-[margin-left] ease-in-out duration-500 md:static top-100 bottom-0 left-0 z-40 border-r-2";
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
        <div>{name}</div>
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
        <Link href={isLandingPage ? "/" : STUDENT_URL.HOME}>
          <Image
            src="/img/huawen-logo.png"
            alt="Company Logo"
            width={120}
            height={120}
            priority
            style={{ height: "auto", width: "auto" }}
          />
        </Link>
        <RightBar hideAccount={isLandingPage} />
      </nav>
      {!isLandingPage && (
        <div className={`${className}${appendClass}`}>
          <Link href={STUDENT_URL.PROFILE}>
            <div className="flex flex-col justify-center items-center my-4">
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  position: "relative",
                }}
              >
                <Image
                  src={
                    profilePicUrl ? profilePicUrl : "/img/blank-profile.jpeg"
                  }
                  alt="Display Picture"
                  fill
                  style={{ objectFit: "cover", borderRadius: "12px" }}
                  className="border-2"
                  priority
                />
              </div>

              <p className="mt-2 font-medium">{loginData?.name ?? "-"}</p>
            </div>
          </Link>

          <div className="flex flex-col border-t-2">
            <MenuItem name="Home" route={STUDENT_URL.HOME} />
            <MenuItem name="Announcement" route={STUDENT_URL.ANNOUNCEMENT} />
          </div>
        </div>
      )}
      {show && !isLandingPage ? <ModalOverlay /> : <></>}
    </div>
  );
}
