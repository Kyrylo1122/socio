import { createContext } from "react";

import { ISavesContext } from "src/types";

export const SavesContext = createContext<ISavesContext>({
  posts: [],
  isPending: false,
});
