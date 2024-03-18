import { ReactNode } from "react";

type HTMLButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export interface ButtonProps extends HTMLButtonProps {
  children: ReactNode;
  fullWidth?: boolean;
}
