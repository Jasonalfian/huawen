import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import RightBar from "../shared/RightBar";

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
        console.log("clicked");
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <div className="flex">
      <nav className="justify-between invisible md:visible z-50 fixed top-0 left-0 right-0 h-[var(--header-height)] bg-white flex [&>*]:my-auto px-6 border-b-2">
        <Link href={isLandingPage ? "/" : "/home"}>
          <Image
            src="/img/huawen-logo.png"
            alt="Company Logo"
            width={120}
            height={120}
            priority
          />
        </Link>
        <RightBar hideAccount={isLandingPage} />
      </nav>
      {!isLandingPage && (
        <div className={`${className}${appendClass}`}>
          <div className="flex flex-col justify-center items-center my-4">
            <Image
              src="/img/mock-dp.avif" // Update with your image path
              alt="Rounded Image"
              width={200}
              height={200}
              className="rounded-full object-cover border-2"
              priority
            />
            <p className="mt-2 font-medium">Cherish</p>
          </div>

          <div className="flex flex-col border-t-2">
            <MenuItem name="Home" route="/home" />
            <MenuItem name="Announcement" route="/announcement" />
          </div>
        </div>
      )}
      {show && !isLandingPage ? <ModalOverlay /> : <></>}
    </div>
  );
}
