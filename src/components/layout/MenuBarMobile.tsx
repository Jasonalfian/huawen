import React from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";

type MenuBarMobileProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuBarMobile({ setter }: MenuBarMobileProps) {
  return (
    <nav
      className={`md:hidden z-20 fixed top-0 left-0 right-0 h-[var(--header-height)] bg-white flex [&>*]:my-auto px-4 border-b-2`}
    >
      <button
        className="flex"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        <MenuIcon />
      </button>
      <Link href="/" className="mx-auto">
        <Image
          src="/img/huawen-logo.png"
          alt="Company Logo"
          width={120}
          height={120}
          priority
        />
      </Link>
      <Link className="text-3xl flex" href="/login">
        <AccountCircleIcon />
      </Link>
    </nav>
  );
}
