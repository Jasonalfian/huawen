"use client";

import Layout from "@/components/layout";
import Link from "next/link";
import React from "react";
import { CertificateData, getCertificates } from "@/client/student";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const Certificate = () => {
  const [listCertificate, setListCertificate] = React.useState<
    CertificateData[]
  >([]);

  React.useEffect(() => {
    getCertificates().then((res) => {
      if (res.data) {
        setListCertificate(res.data.data);
      }
    });
  }, []);

  const { t } = useTranslation();

  return (
    <Layout>
      <div className="text-2xl font-medium text-black p-4 border-2 bg-theme-yellow rounded-lg">
        <h1>{t("account.my_certificate")}</h1>
      </div>

      <div className="my-8 flex flex-col max-w-max gap-2">
        {listCertificate.length > 0 ? (
          listCertificate.map((certificate) => {
            return (
              <Link target="none" key={certificate.id} href={certificate.url}>
                <Button
                  fullWidth
                  sx={{
                    background: "black",
                    textAlign: "left",
                    justifyContent: "flex-start",
                  }}
                  variant="contained"
                >
                  {certificate.name}
                </Button>
              </Link>
            );
          })
        ) : (
          <p>{t("common.no_data")}</p>
        )}
      </div>
    </Layout>
  );
};

export default Certificate;
