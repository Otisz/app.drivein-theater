"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { THEME_STORAGE_KEY } from "~/next.constants.mjs";

type Props = Readonly<PropsWithChildren>;

export default function ThemeProvider(props: Props) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey={THEME_STORAGE_KEY}
    >
      {props.children}
    </NextThemeProvider>
  );
}
