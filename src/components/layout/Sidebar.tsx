import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

type MenuItemProps = {
  route: string;
  name: string;
};

type SidebarProps = {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ show, setter }: SidebarProps) {
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

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "var(--theme-cream)",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      padding: 0,
    },
  }));

  return (
    <div className="flex">
      <nav className="justify-between invisible md:visible z-50 fixed top-0 left-0 right-0 h-[var(--header-height)] bg-white flex [&>*]:my-auto px-6 border-b-2">
        <Link href="/home">
          {/*eslint-disable-next-line*/}
          <Image
            src="/img/huawen-logo.png"
            alt="Company Logo"
            width={120}
            height={120}
            priority
          />
        </Link>
        <div className="space-x-2">
          <HtmlTooltip
            placement="bottom"
            title={
              <React.Fragment>
                <div className="text-sm text-center">
                  <p className="p-2 border-b-2">English</p>
                  <p className="p-2 border-b-2">简体中文</p>
                  <p className="p-2 border-b-2">Bahasa Indonesia</p>
                  <p className="p-2">繁體中文</p>
                </div>
              </React.Fragment>
            }
          >
            <LanguageIcon fontSize="large" />
          </HtmlTooltip>
          <HtmlTooltip
            placement="bottom-start"
            title={
              <React.Fragment>
                <div className="text-sm">
                  <p className="p-2 border-b-2">Student Information</p>
                  <p className="p-2 border-b-2">My Certificate</p>
                  <p className="p-2">Sign Out</p>
                </div>
              </React.Fragment>
            }
          >
            <AccountCircleIcon fontSize="large" />
          </HtmlTooltip>
        </div>
      </nav>
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
      {show ? <ModalOverlay /> : <></>}
    </div>
  );
}
