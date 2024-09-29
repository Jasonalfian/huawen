"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalStore from "@/libs/global";
import { postReset } from "@/client/login";
import { ResetFormData, resetFormSchema } from "../../../modules/Login/schema";
import Layout from "@/components/layout";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    ROOT
} from "@/libs/constant";

type ResetProps = {
    params: { token: string };
};

export default function Reset({ params }: ResetProps) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      token: params.token
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
            setErrorMessage(res.data.message)
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
    <Layout isLandingPage>
      <div className="flex flex-col items-center justify-center h-[60vh] mt-8">
      <div
        className="flex flex-col items-center gap-4 "
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1 className="text-4xl font-medium">Reset Password</h1>
        <p>Reset password for: {params.token.split('.')[0]}</p>
        <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            fullWidth
            id="outlined-basic"
            label="New Password"
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
          Submit
        </Button>
      </div>
        </div>
      </Layout>
  );
}
