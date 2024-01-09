import { useContext } from "react";
import {
  DialogContext,
  IDialogContext,
} from "src/context/DialogContext/DialogContext";

const useDialogContext = () => useContext<IDialogContext>(DialogContext);

export default useDialogContext;
