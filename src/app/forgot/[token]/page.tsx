"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postReset } from "@/client/login";
import { ResetFormData, resetFormSchema } from "../../../modules/Login/schema";
import Layout from "@/components/layout";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ROOT } from "@/libs/constant";
import { useTranslation } from "react-i18next";

type ResetProps = {
  params: { token: string };
};

export default function Reset({ params }: ResetProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      token: params.token,
    },
    resolver: yupResolver(resetFormSchema),
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    setErrorMessage("");
    postReset(data)
      .then((res) => {
        if (res.data?.success) {
          window.location.href = ROOT;
        } else {
          setErrorMessage(res.data.message);
        }
      })
      .catch((e) => {
        if (typeof e.response === "undefined") {
          setErrorMessage(t("login.error_server"));
        } else {
          setErrorMessage(e.response.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const decodeHTML = (input: string) => {
    return decodeURIComponent(input);
  };

  return (
    <Layout isLandingPage>
      <div className="flex flex-col items-center justify-center h-[60vh] mt-8">
        <div
          className="flex flex-col items-center gap-4 "
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h1 className="text-4xl font-medium">{t("token.reset_password")}</h1>
          <p>
            {t("token.reset_password_for")}:{" "}
            {decodeHTML(params.token.split(".")[0])}
          </p>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                fullWidth
                id="outlined-basic"
                label={t("token.new_password")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message ?? ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...field}
              />
            )}
          />

          <p style={{ color: "#d32f2f" }}>{errorMessage}</p>

          <Button
            variant="contained"
            onClick={onSubmit}
            className="mt-2"
            fullWidth
            sx={{ height: "50px", background: "black" }}
            disabled={isLoading}
          >
            {t("common.save")}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
