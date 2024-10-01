"use client";
import React from "react";
import { postBypassLogin } from "@/client/login";
import useGlobalStore from "@/libs/global";
import { useRouter } from "next/navigation";
import { ROOT } from "@/libs/constant";

type BypassProps = {
    params: { token: string };
};

export default function Bypass({ params }: BypassProps) {
    const router = useRouter();
    const { login } = useGlobalStore();

    React.useEffect(() => {
        postBypassLogin(params)
        .then((res) => {
            if (res.data?.token) {
                login(res.data.token, res.data.data);
            }
          })
        .catch((e) => {
            if(typeof e.response === 'undefined'){
                window.alert('Connection issue!');
            } else {
                window.alert(e.response.data.message);
            }
        })
        .finally(() => {
            router.push(ROOT);
        });
    }, []);
      
    return (
        <p>Loading...</p>
    );
};