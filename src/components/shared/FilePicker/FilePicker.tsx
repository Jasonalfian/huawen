import classNames from "classnames";
import React, { useRef, useState } from "react";
import styles from "./FilePicker.module.css";
import { fileAccepts } from "./utils";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

export const MB_UNIT = 10 ** 6;

type FileUploadProps = {
  description?: string | React.ReactNode;
  maxSize: number;
  onButtonClicked?: () => void;
  onFilesSubmit: (files: File[]) => void;
  fullHeight?: boolean;
  multiple?: boolean;
  customComponent?: (
    onButtonClick: () => void,
    disabled?: boolean
  ) => JSX.Element;
  buttonId?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const FilePicker = ({
  accept,
  description,
  disabled,
  maxSize,
  onFilesSubmit,
  className,
  onButtonClicked,
  fullHeight,
  customComponent,
  buttonId,
  multiple = false,
  ...props
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [highlight, setHighlight] = useState(false);

  const maxSizeToString = (maxSize: number, unit: "MB") => {
    let result = "";
    switch (unit) {
      case "MB":
        result = `${maxSize / MB_UNIT}MB`;
        break;
      default:
        break;
    }
    return result;
  };

  const onButtonClick = () => {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
    if (disabled) {
      return;
    }
    inputRef.current?.click();
    if (onButtonClicked) onButtonClicked();
  };

  const fileFilter = (file: File) => {
    if (file.size > maxSize) {
      toast.error(`File size more than ${maxSizeToString(maxSize, "MB")}`);
    }
    return (
      fileAccepts({ name: file.name, type: file.type }, accept) &&
      file.size <= maxSize
    );
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!disabled) {
      setHighlight(true);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    const allowedFiles = Array.from(event.dataTransfer.files).filter(
      fileFilter
    );
    onFilesSubmit(allowedFiles);
  };

  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    const allowedFiles = Array.from(event.currentTarget.files || []).filter(
      fileFilter
    );
    onFilesSubmit(allowedFiles);
  };

  if (customComponent) {
    return (
      <>
        <input
          {...props}
          accept={accept}
          ref={inputRef}
          className={styles.input}
          onChange={onChange}
          type="file"
          multiple={multiple}
        />
        {customComponent(onButtonClick, disabled)}
      </>
    );
  }

  return (
    <div
      className={classNames(styles.container, className, {
        [styles.highlight]: highlight,
        [styles.fullHeight]: fullHeight,
      })}
      onDragLeave={() => setHighlight(false)}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        {...props}
        accept={accept}
        ref={inputRef}
        className={styles.input}
        onChange={onChange}
        type="file"
        multiple={multiple}
      />
      <p>{description || "Drag and Drop to upload File here"}</p>
      <p>or</p>
      <Button
        disabled={disabled}
        onClick={onButtonClick}
        type="button"
        id={buttonId}
      >
        Browse to upload
      </Button>
    </div>
  );
};

export default FilePicker;
