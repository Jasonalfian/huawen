"use client";

import Layout from "@/components/layout";
import Link from "next/link";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import React from "react";
import { CertificateData, getCertificates } from "@/client/student";
import { Button } from "@mui/material";

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

  return (
    <Layout>
      <div className="text-2xl font-medium text-black p-4 border-2 bg-theme-yellow rounded-lg">
        <h1>My Certificate </h1>
      </div>

      <div className="my-8 flex flex-col gap-2">
        {listCertificate.length > 0 ? (
          listCertificate.map((certificate) => {
            return (
              <Link target="none" key={certificate.id} href={certificate.url}>
                <Button sx={{ background: "black" }} variant="contained">
                  {certificate.name}
                </Button>
              </Link>
            );
          })
        ) : (
          <p>No Certificate found</p>
        )}
      </div>
    </Layout>
  );
};

export default Certificate;
