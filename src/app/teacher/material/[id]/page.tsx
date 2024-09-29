"use client";

import {
  MaterialData,
  createMaterial,
  editMaterial,
  getLessonMaterials,
  uploadFile,
  UploadFileData,
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
        toast.success("Material updated");
        fetchMaterials();
        handleClose();
      })
      .catch(() => {
        toast.error("Failed updating material");
      })
      .finally(() => {
        setIsLoading(false);
      });
    return;
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
              toast.success("Material Created");
              fetchMaterials();
              handleClose();
            })
            .catch(() => {
              toast.error("Failed creating material");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      })
      .catch((res) => {
        if (res.response.data) {
          toast.error(res.response.data.message ?? "Failed uploading file");
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
          <h1 className="text-4xl my-6">Class Materials</h1>
          <Button
            sx={{
              background: "black",
              height: "40px",
            }}
            variant="contained"
            onClick={handleOpen}
          >
            Create +
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {listMaterial.length > 0 ? (
            listMaterial.map((material) => {
              return (
                <div key={material.material_id}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <h2 className="font-semibold">{material.description}</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="space-x-2">
                        <Link target="none" href={material.link}>
                          <Button
                            sx={{
                              background: "black",
                            }}
                            variant="contained"
                          >
                            Current task link
                          </Button>
                        </Link>

                        <Button
                          sx={{
                            background: "black",
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
                          Edit
                        </Button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })
          ) : (
            <p>No materials found</p>
          )}
        </div>
      </div>

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
              label="description"
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
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </Layout>
  );
};

export default Material;
