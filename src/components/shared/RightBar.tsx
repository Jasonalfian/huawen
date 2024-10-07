import React from "react";
import Link from "next/link";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import useGlobalStore from "@/libs/global";
import { ROLE_STUDENT, STUDENT_URL } from "@/libs/constant";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

type RightBarProps = {
  hideAccount?: boolean;
};

const RightBar = (props: RightBarProps) => {
  const { hideAccount = false } = props;
  const { logout } = useGlobalStore();
  const pathname = usePathname();
  const isStudentPage = pathname.includes(ROLE_STUDENT.toLowerCase());
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

  const { updateLanguage } = useGlobalStore();

  const [languageOpen, setLanguageOpen] = React.useState(false);
  const handleLanguageClose = () => {
    setLanguageOpen(false);
  };
  const handleLanguageOpen = () => {
    setLanguageOpen(!languageOpen);
  };

  const selectLanguage = (lang: string) => {
    updateLanguage(lang);
    handleLanguageClose();
  };

  const [profileOpen, setProfileOpen] = React.useState(false);
  const handleProfileClose = () => {
    setProfileOpen(false);
  };
  const handleProfileOpen = () => {
    setProfileOpen(!languageOpen);
  };

  const { t } = useTranslation();

  return (
    <div className="space-x-2">
      <HtmlTooltip
        open={languageOpen}
        onClose={handleLanguageClose}
        onClick={handleLanguageOpen}
        placement={hideAccount ? "bottom-start" : "bottom"}
        title={
          <React.Fragment>
            <div className="text-sm text-center">
              <p
                onClick={() => selectLanguage("en")}
                className="p-2 border-b-2"
              >
                English
              </p>
              <p
                onClick={() => {
                  selectLanguage("cn");
                }}
                className="p-2 border-b-2"
              >
                简体中文
              </p>
              <p
                onClick={() => {
                  selectLanguage("id");
                }}
                className="p-2 border-b-2"
              >
                Bahasa Indonesia
              </p>
              <p
                onClick={() => {
                  selectLanguage("tw");
                }}
                className="p-2"
              >
                繁體中文
              </p>
            </div>
          </React.Fragment>
        }
      >
        <LanguageIcon fontSize="large" />
      </HtmlTooltip>
      {!hideAccount && (
        <HtmlTooltip
          open={profileOpen}
          onClose={handleProfileClose}
          onClick={handleProfileOpen}
          placement="bottom-start"
          title={
            <React.Fragment>
              <div className="text-sm">
                {isStudentPage && (
                  <>
                    <Link href={STUDENT_URL.PROFILE}>
                      <p className="p-2 border-b-2">
                        {t("account.student_info")}
                      </p>
                    </Link>
                    <Link href={STUDENT_URL.CERTIFICATE}>
                      <p className="p-2 border-b-2">
                        {t("account.my_certificate")}
                      </p>
                    </Link>
                  </>
                )}
                <div onClick={logout}>
                  <p className="p-2">{t("common.sign_out")}</p>
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
