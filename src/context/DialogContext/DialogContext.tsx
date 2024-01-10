import { createContext } from "react";
import { DIALOG_INITIAL_STATE } from "src/constant";
import { IDialogContext } from "src/types";

export const DialogContext =
  createContext<IDialogContext>(DIALOG_INITIAL_STATE);
