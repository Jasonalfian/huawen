"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalStore from "@/libs/global";
import { postForgot } from "@/client/login";
import { ForgotFormData, forgotFormSchema } from "../../modules/Login/schema";
import Layout from "@/components/layout";
import Turnstile, { useTurnstile } from "react-turnstile";
import { ROOT } from "@/libs/constant";
import { useRouter } from "next/navigation";

export default function Forgot() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ForgotFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      token: "",
    },
    resolver: yupResolver(forgotFormSchema),
  });

  const { login } = useGlobalStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const turnstile = useTurnstile();

  const onSubmit = handleSubmit((data) => {
    if (turnstileStatus !== "success") {
      setErrorMessage("Make sure you're not a robot");
    } else {
      setIsLoading(true);
      setErrorMessage("");
      postForgot(data)
        .then((res) => {
          if (res.data?.success) {
            window.alert(
              "Password reset link has been sent to registered email"
            );
            setValue("username", "");
            router.push(ROOT);
          } else {
            setErrorMessage(res.data.message);
          }
        })
        .catch((e) => {
          if (typeof e.response === "undefined") {
            setErrorMessage("Failed to connect to server");
          } else {
            setErrorMessage(e.response.data.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
          turnstile.reset();
        });
    }
  });

  const [errorMessage, setErrorMessage] = React.useState("");
  const [turnstileStatus, setTurnstileStatus] = React.useState<
    "success" | "error" | "expired" | "required"
  >("required");

  return (
    <Layout isLandingPage>
      <div className="flex flex-col items-center justify-center h-[60vh] mt-8">
        <div
          className="flex flex-col items-center gap-4 "
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h1 className="text-4xl font-medium mb-2">Forgot Password?</h1>
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

          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onError={() => {
              setTurnstileStatus("error");
              setValue("token", "");
            }}
            onExpire={() => {
              setTurnstileStatus("expired");
              setValue("token", "");
            }}
            onSuccess={() => {
              setTurnstileStatus("success");
            }}
            onVerify={(token) => {
              setTurnstileStatus("success");
              setValue("token", token);
            }}
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
