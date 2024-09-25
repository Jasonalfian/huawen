import React from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import RightBar from "../shared/RightBar";
import { STUDENT_URL } from "@/libs/constant";

type NavbarMobileProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  isLandingPage?: boolean;
};

export default function NavbarMobile({
  setter,
  isLandingPage,
}: NavbarMobileProps) {
  return (
    <nav
      className={`md:hidden z-20 fixed top-0 left-0 right-0 h-[var(--header-height)] bg-white flex [&>*]:my-auto px-4 border-b-2`}
    >
      {!isLandingPage && (
        <button
          className="flex"
          onClick={() => {
            setter((oldVal) => !oldVal);
          }}
        >
          <MenuIcon fontSize="large" />
        </button>
      )}
      <Link href={isLandingPage ? "/" : STUDENT_URL.HOME} className="mx-auto">
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
  );
}
