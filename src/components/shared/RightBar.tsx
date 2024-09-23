import React from "react";
import Link from "next/link";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import useGlobalStore from "@/libs/global";

type RightBarProps = {
  hideAccount?: boolean;
};

const RightBar = (props: RightBarProps) => {
  const { hideAccount = false } = props;
  const { logout } = useGlobalStore();
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
    <div className="space-x-2">
      <HtmlTooltip
        placement={hideAccount ? "bottom-start" : "bottom"}
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
      {!hideAccount && (
        <HtmlTooltip
          placement="bottom-start"
          title={
            <React.Fragment>
              <div className="text-sm">
                <Link href="/account/info">
                  <p className="p-2 border-b-2">Student Information</p>
                </Link>
                <Link href="/account/certificate">
                  <p className="p-2 border-b-2">My Certificate</p>
                </Link>
                <div onClick={logout}>
                  <p className="p-2">Sign Out</p>
                </div>
              </div>
            </React.Fragment>
          }
        >
          <AccountCircleIcon fontSize="large" />
        </HtmlTooltip>
      )}
    </div>
  );
};

export default RightBar;
