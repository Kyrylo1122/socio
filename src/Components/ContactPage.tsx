import { useParams } from "react-router-dom";
import PageMarkUp from "./PageMarkup";
import { useGetFriendsById, useGetUserById } from "src/lib/react-query";
import { Typography } from "@mui/material";

export const ContactPage = () => {
  const { id } = useParams();
  const { data: user } = useGetUserById(id!);
  const { data: friends } = useGetFriendsById(id);

  if (!user || !friends)
    return <Typography>Oops, something went wrong</Typography>;
  return <PageMarkUp friends={friends} user={user} />;
};
