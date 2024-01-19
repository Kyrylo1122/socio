import { useContext } from "react";
import { SavesContext } from "src/context/SavesContext/SavesContext";

const useSavesContext = () => useContext(SavesContext);

export default useSavesContext;
