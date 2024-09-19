/**
 * Copyright (c) PT Pintu Kemana Saja 2023 All Rights Reserved.
 */

// app/fonts.ts
import { IBM_Plex_Mono, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const IBMPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
});

export const fonts = {
  inter,
  IBMPlexMono,
};
