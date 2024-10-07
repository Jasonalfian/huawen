/**
 * Copyright (c) PT Pintu Kemana Saja 2023 All Rights Reserved.
 */

import { createInstance, type i18n, type TFunction } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

const K_FALLBACK_LANGUAGE = "en";
const K_DEFAULT_LOCALE = "en";
const K_SUPPORTED_LANGUAGES = ["id", "en", "cn", "tw"] as const;
const K_DEFAULT_NAMESPACE = "common";

const runsOnServerSide = typeof window === "undefined";
let i18nInstance: Promise<TFunction<"translation", undefined>> | null = null;

export function initTranslation(locale: string, instance: i18n) {
  if (!i18nInstance) {
    i18nInstance = instance
      .use(initReactI18next)
      .use(LanguageDetector)
      .use(
        resourcesToBackend((language: string, namespace: string) => {
          return import(`./locales/${language}/${namespace}.json`);
        })
      )
      .init({
        debug: false,
        supportedLngs: K_SUPPORTED_LANGUAGES,
        fallbackLng: K_FALLBACK_LANGUAGE,
        fallbackNS: K_DEFAULT_NAMESPACE,
        ns: K_DEFAULT_NAMESPACE,
        defaultNS: K_DEFAULT_NAMESPACE,
        lng: locale ?? K_DEFAULT_LOCALE,
        detection: {
          order: ["path", "htmlTag", "cookie", "navigator"],
          caches: ["cookie"],
        },
        preload: runsOnServerSide ? K_SUPPORTED_LANGUAGES : [],
      });
  }

  return i18nInstance;
}

const i18nAsyncInstance = createInstance();

export async function initServerSideTranslation(locale?: string) {
  await i18nAsyncInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        return import(`./locales/${language}/${namespace}.json`);
      })
    )
    .init({
      debug: false,
      supportedLngs: K_SUPPORTED_LANGUAGES,
      fallbackLng: K_FALLBACK_LANGUAGE,
      fallbackNS: K_DEFAULT_NAMESPACE,
      ns: K_DEFAULT_NAMESPACE,
      defaultNS: K_DEFAULT_NAMESPACE,
      lng: locale ?? K_DEFAULT_LOCALE,
      preload: K_SUPPORTED_LANGUAGES,
    });

  return i18nAsyncInstance;
}
