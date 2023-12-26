import { useParams } from "react-router-dom";
import PageMarkUp from "./PageMarkup";
import { useGetUsersById } from "src/lib/react-query";
import { Typography } from "@mui/material";

export const ContactPage = () => {
  const { id } = useParams();
  const { data } = useGetUsersById(id!);

  if (!data) return <Typography>Oops, something went wrong</Typography>;
  return <PageMarkUp user={data} />;
};
