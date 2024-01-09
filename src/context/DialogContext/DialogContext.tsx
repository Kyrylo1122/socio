import { createContext } from "react";

export interface IDialogContext {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
}
const DIALOG_INITIAL_STATE = {
  isOpen: true,
  close: () => {},
  open: () => {},
  toggle: () => {},
};
export const DialogContext =
  createContext<IDialogContext>(DIALOG_INITIAL_STATE);
