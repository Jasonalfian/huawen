"use client";
import React from "react";
import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";

import { initTranslation } from "./init";

type TranslationProviderProps = {
  children: React.ReactNode;
  locale: string;
};

export const i18n = createInstance();

function TranslationProvider(props: TranslationProviderProps) {
  const { children, locale } = props;
  const [isInitialized, setIsInitialized] = React.useState(i18n.isInitialized);

  React.useEffect(() => {
    if (!isInitialized) {
      initTranslation(locale, i18n).then(() => {
        setIsInitialized(i18n.isInitialized);
      });

      return () => {
        <p>Loading</p>;
      };
    } else {
      i18n.changeLanguage(locale);
    }
  }, [isInitialized, locale]);

  if (!isInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default TranslationProvider;
