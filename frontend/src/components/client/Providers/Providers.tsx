"use client";

import { Provider } from "jotai";

type ProvidersPropTypes = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersPropTypes) => {
  return <Provider>{children}</Provider>;
};
