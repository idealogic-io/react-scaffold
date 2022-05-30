import React from "react";
import { DefaultTheme } from "styled-components";

export type FCWithChildren = {
  children: React.ReactNode;
};

export interface ThemedProps {
  theme: DefaultTheme;
}
