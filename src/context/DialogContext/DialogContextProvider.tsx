import { useState } from "react";
import { DialogContext } from "./DialogContext";

const DialogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisibleChatBtn, setIsVisibleChatBtn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((state) => !state);
  const setIsVisibleBtn = () => {
    setIsVisibleChatBtn(true);
  };
  const setIsInvisibleBtn = () => {
    setIsVisibleChatBtn(false);
  };
  const value = {
    setIsVisibleBtn,
    setIsInvisibleBtn,
    isVisibleChatBtn,
    setIsVisibleChatBtn,
    isOpen,
    close,
    open,
    toggle,
  };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};

export default DialogContextProvider;
