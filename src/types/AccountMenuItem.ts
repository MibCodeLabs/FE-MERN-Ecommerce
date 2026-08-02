import type { ReactNode } from "react";

export interface AccountMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}