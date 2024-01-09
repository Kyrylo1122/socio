import { useState } from "react";
import { DialogContext } from "./DialogContext";

const DialogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((state) => !state);
  const value = { isOpen, close, open, toggle };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};

export default DialogContextProvider;
