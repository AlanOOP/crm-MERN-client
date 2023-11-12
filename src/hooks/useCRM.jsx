import { useContext } from "react";
import CRMContext from "../context/CRMProvider";

const useCRM = () => {
  return useContext(CRMContext);
}

export default useCRM