type File = {
  name?: string;
  type?: string;
};

export const fileAccepts = (file: File, acceptedFiles?: string) => {
  if (acceptedFiles) {
    const acceptedFilesArray = acceptedFiles.split(",");

    const fileName = file.name || "";
    const fileType = (file.type || "").toLowerCase();
    const baseFileType = fileType.replace(/\/.*$/, "");

    return acceptedFilesArray.some((type) => {
      const validType = type.trim().toLowerCase();

      if (validType[0] === ".") {
        return fileName.toLowerCase().endsWith(validType);
      }
      if (validType.endsWith("/*")) {
        return baseFileType === validType.replace(/\/.*$/, "");
      }
      return fileType === validType;
    });
  }
  return true;
};
