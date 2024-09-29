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
        if(typeof e.response === 'undefined'){
          setErrorMessage("Failed to connect to server");
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

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

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
            label="Username / Email"
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
            label="Password"
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
      <Link href={FORGOT_PASSWORD_URL}> 
        <p style={{ color: "#a1a1a1" }}>Forgot password?</p>
      </Link>
      
      <Button
        variant="contained"
        onClick={onSubmit}
        className="mt-2"
        fullWidth
        sx={{ height: "50px", background: "black" }}
        disabled={isLoading}
      >
        Submit
      </Button>
    </div>
  );
};

export default Login;
