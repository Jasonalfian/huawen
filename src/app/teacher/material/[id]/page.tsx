"use client";

import {
  MaterialData,
  createMaterial,
  editMaterial,
  getLessonMaterials,
  uploadFile,
  UploadFileData,
  removeMaterial,
} from "@/client/teacher";
import Layout from "@/components/layout";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import { ACCEPT_FILE, MODAL_STYLE } from "@/libs/constant";
import { Close } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

type MaterialProps = {
  params: { id: string };
};

const Material = ({ params }: MaterialProps) => {
  const [listMaterial, setListMaterial] = React.useState<MaterialData[]>([]);
  const fetchMaterials = () => {
    getLessonMaterials(params.id).then((res) => {
      if (res.data) {
        setListMaterial(res.data.data);
      }
    });
  };
  React.useEffect(() => {
    fetchMaterials();
  }, []);

  const [file, setFile] = React.useState<File | null>(null);
  const [submitUrl, setSubmitUrl] = React.useState("");
  const [materialId, setMaterialId] = React.useState("");
  const [meta, setMeta] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [description, setDescription] = React.useState("");

  const [expanded, setExpanded] = React.useState(false);

  const [openRemove, setOpenRemove] = React.useState(false);
  const [selectedMaterial, setSelectedMaterial] =
    React.useState<MaterialData | null>(null);

  const handleOpenRemove = (material: MaterialData) => {
    setOpenRemove(true);
    setSelectedMaterial(material);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
    setSelectedMaterial(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setFile(null);
    setIsEdit(false);
    setDescription("");
    setSubmitUrl("");
    setMaterialId("");
    setMeta("");
    setOpen(false);
  };

  const { t } = useTranslation();

  const doEditMaterial = (fileRes: UploadFileData) => {
    editMaterial(
      {
        description,
        link: fileRes.url,
        meta: fileRes.type,
      },
      materialId
    )
      .then(() => {
        toast.success(t("common.success_submit"));
        fetchMaterials();
        handleClose();
      })
      .catch(() => {
        toast.error(t("common.fail_submit"));
      })
      .finally(() => {
        setIsLoading(false);
      });
    return;
  };

  const doRemoveMaterial = () => {
    if (selectedMaterial) {
      removeMaterial(selectedMaterial?.material_id)
        .then(() => {
          toast.success(t("common.success_submit"));
          fetchMaterials();
        })
        .catch((res) => {
          if (res.response) {
            toast.error(res.response.data.message);
          } else {
            toast.error(t("common.fail_submit"));
          }
        })
        .finally(() => {
          handleCloseRemove();
        });
    }
  };

  const onSubmitTask = () => {
    setIsLoading(true);
    if (file === null) {
      doEditMaterial({
        url: submitUrl,
        type: meta,
      });
      return;
    }
    const formData = new FormData();
    formData.append("fileToUpload", file);

    uploadFile(formData)
      .then((res) => {
        if (res.data) {
          const fileRes: UploadFileData = res.data.data;

          if (isEdit) {
            doEditMaterial(fileRes);
            return;
          }

          createMaterial({
            lesson_id: params.id,
            link: fileRes.url,
            description,
          })
            .then(() => {
              toast.success(t("common.success_submit"));
              fetchMaterials();
              handleClose();
            })
            .catch(() => {
              toast.success(t("common.fail_submit"));
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      })
      .catch((res) => {
        if (res.response.data) {
          toast.error(res.response.data.message ?? t("common.fail_submit"));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <div>
        <div className="className=mt-2"></div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl my-6">{t("lesson.card.material")}</h1>
          <Button
            sx={{
              borderColor: "black",
              color: "black",
              height: "40px",
              width: "120px",
            }}
            variant="outlined"
            onClick={handleOpen}
          >
            {t("common.create")} +
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {listMaterial.length > 0 ? (
            listMaterial.map((material) => {
              return (
                <div key={material.material_id}>
                  <Accordion
                    expanded={expanded}
                    onClick={() => {
                      setExpanded(false);
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        textAlign: "left",
                        textTransform: "none",
                        whiteSpace: "normal", // Allows the text to break
                        wordBreak: "break-word", // Breaks words that are too long for one line
                      }}
                    >
                      <div className="flex gap-4 justify-between w-full">
                        <h2 className="font-semibold">
                          {material.description}
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            sx={{
                              background: "maroon",
                              width: "100px",
                            }}
                            variant="contained"
                            onClick={() => {
                              handleOpenRemove(material);
                            }}
                          >
                            {t("common.remove")}
                          </Button>

                          <Button
                            sx={{
                              background: "black",
                              width: "100px",
                            }}
                            variant="contained"
                            onClick={() => {
                              handleOpen();
                              setIsEdit(true);
                              setMaterialId(material.material_id);
                              setDescription(material.description);
                              setSubmitUrl(material.link);
                            }}
                          >
                            {t("common.detail")}
                          </Button>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                </div>
              );
            })
          ) : (
            <p>{t("common.no_data")}</p>
          )}
        </div>
      </div>

      <Modal
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODAL_STYLE}>
          <div className="flex flex-col justify-center">
            <div className="flex text-center justify-center">
              <h2>
                {t("material.remove_confirmation")}
                <br />
                <span className="font-bold">
                  {selectedMaterial?.description}
                </span>
              </h2>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <Button
                onClick={handleCloseRemove}
                sx={{ background: "black" }}
                variant="contained"
              >
                {t("common.cancel")}
              </Button>
              <Button
                onClick={doRemoveMaterial}
                sx={{ background: "maroon" }}
                variant="contained"
              >
                {t("common.yes")}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODAL_STYLE}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 4, right: 4 }}
          >
            <Close />
          </IconButton>
          <div className="flex flex-col gap-4 ">
            <TextField
              id="outlined-basic"
              label={t("common.description")}
              variant="outlined"
              value={description}
              multiline
              rows={2}
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
            <FilePicker
              accept={ACCEPT_FILE}
              multiple={false}
              maxSize={20 * MB_UNIT}
              onFilesSubmit={(files) => {
                if (files.length > 0) {
                  setFile(files[0]);
                }
              }}
            />

            <div>
              {file?.name ? (
                <p>{file.name}</p>
              ) : (
                submitUrl && (
                  <Link target="none" href={submitUrl}>
                    <Button
                      sx={{
                        textDecoration: "underline",
                        textAlign: "left",
                        textTransform: "none",
                        whiteSpace: "normal", // Allows the text to break
                        wordBreak: "break-word", // Breaks words that are too long for one line
                      }}
                      variant="text"
                    >
                      {submitUrl}
                    </Button>
                  </Link>
                )
              )}
            </div>
            <Button
              onClick={onSubmitTask}
              className="px-6"
              variant="contained"
              disabled={
                (file === null && !submitUrl) || isLoading || !description
              }
            >
              {t("common.submit")}
            </Button>
          </div>
        </Box>
      </Modal>
    </Layout>
  );
};

export default Material;
