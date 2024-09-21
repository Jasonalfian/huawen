"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginFormSchema } from "./schema";
import useAuthStore from "@/libs/auth";
import { postLogin } from "@/client/login";
import { redirect } from "next/navigation";

const Login = () => {
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

  const { login } = useAuthStore();

  const onSubmit = handleSubmit((data) => {
    setErrorMessage("");
    postLogin(data)
      .then((res) => {
        console.log(res.data.token);
        if (res.data?.token) {
          login(res.data.token);
        }
      })
      .catch((res) => {
        console.log(res);
        setErrorMessage("Invalid Credential");
      });
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <div
      className="flex flex-col items-center gap-4 "
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <h1 className="text-4xl font-medium">Login</h1>
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            error={errors.username != null}
            helperText={errors.username?.message ?? ""}
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
            label="password"
            variant="outlined"
            error={errors.password != null}
            helperText={errors.password?.message ?? ""}
            {...field}
          />
        )}
      ></Controller>

      <p style={{ color: "#d32f2f" }}>{errorMessage}</p>

      <Button
        variant="contained"
        onClick={onSubmit}
        className="mt-2"
        fullWidth
        sx={{ height: "50px", background: "black" }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Login;
