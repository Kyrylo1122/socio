import { ReactNode } from "react";

import { SavesContext } from "./SavesContext";
import { useUserContext } from "src/hooks/useUserContext";
import { useGetSaves } from "src/lib/react-query";

export const SavesContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();
  const { data, isPending } = useGetSaves(user.uid);

  const value = { posts: data?.posts ?? [], isPending };
  return (
    <SavesContext.Provider value={value}>{children}</SavesContext.Provider>
  );
};
