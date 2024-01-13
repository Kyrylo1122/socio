import { useContext } from "react";
import { DialogContext } from "src/context/DialogContext/DialogContext";
import { IDialogContext } from "src/types";

const useDialogContext = () => useContext<IDialogContext>(DialogContext);

export default useDialogContext;
