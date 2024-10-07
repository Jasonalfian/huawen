"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginFormSchema } from "./schema";
import useGlobalStore from "@/libs/global";
import { postLogin } from "@/client/login";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FORGOT_PASSWORD_URL } from "@/libs/constant";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginFormSchema),
  });

  const { login } = useGlobalStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    setErrorMessage("");
    postLogin(data)
      .then((res) => {
        if (res.data?.token) {
          login(res.data.token, res.data.data);
        }
      })
      .catch((e) => {
        if (typeof e.response === "undefined") {
          setErrorMessage("login.error_server");
        } else {
          setErrorMessage("login.error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div
      className="flex flex-col items-center gap-4 "
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <h1 className="text-4xl font-medium">{t("login.title")}</h1>
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            label={t("common.username_email")}
            variant="outlined"
            error={!!errors.username}
            helperText={
              errors.username?.message ? t(errors.username.message) : ""
            }
            {...field}
            fullWidth
          />
        )}
      ></Controller>

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            fullWidth
            id="outlined-basic"
            label={t("common.password")}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={
              errors.password?.message ? t(errors.password.message) : ""
            }
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

      <p style={{ color: "#d32f2f" }}>{t(errorMessage)}</p>
      <Link href={FORGOT_PASSWORD_URL}>
        <p style={{ color: "#a1a1a1" }}>{t("common.forgot_password")}</p>
      </Link>

      <Button
        variant="contained"
        onClick={onSubmit}
        className="mt-2"
        fullWidth
        sx={{ height: "50px", background: "black" }}
        disabled={isLoading}
      >
        {t("common.submit")}
      </Button>
    </div>
  );
};

export default Login;
