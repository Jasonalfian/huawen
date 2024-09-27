"use client";

import {
  MaterialData,
  createMaterial,
  getLessonMaterials,
  uploadFile,
  uploadFileData,
} from "@/client/teacher";
import Layout from "@/components/layout";
import FilePicker, { MB_UNIT } from "@/components/shared/FilePicker/FilePicker";
import { ACCEPT_FILE } from "@/libs/constant";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import image from "next/image";
import Link from "next/link";
import React from "react";

type MaterialProps = {
  params: { id: string };
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Material = ({ params }: MaterialProps) => {
  const [listMaterial, setListMaterial] = React.useState<MaterialData[]>([]);

  React.useEffect(() => {
    getLessonMaterials(params.id).then((res) => {
      if (res.data) {
        setListMaterial(res.data.data);
      }
    });
  }, []);

  const [file, setFile] = React.useState<File | null>(null);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [description, setDescription] = React.useState("");

  const onSubmitTask = () => {
    setIsLoading(true);
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("fileToUpload", file);

      uploadFile(formData).then((res) => {
        if (res.data) {
          const fileRes: uploadFileData = res.data.data;
          createMaterial({
            lesson_id: params.id,
            link: fileRes.url,
            description,
          });
        }
      });
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div>
        <div className="className=mt-2">
          <Button onClick={handleOpen}>Create Material</Button>
        </div>
        <h2 className="text-xl mb-2 font-bold">Class Materials</h2>
        <div className="flex flex-col max-w-max gap-2">
          {listMaterial.map((material) => {
            return (
              <Link
                target="none"
                key={material.material_id}
                href={material.link}
              >
                <Button sx={{ background: "black" }} variant="contained">
                  {material.description}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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

            <div>{file?.name && <p>{file.name}</p>}</div>
            <Button
              onClick={onSubmitTask}
              className="px-6"
              variant="contained"
              disabled={file === null || isLoading || !description}
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
