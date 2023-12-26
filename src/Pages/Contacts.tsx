import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Spinner from "src/Components/Spinner";
import { useGetUsers } from "src/lib/react-query";
import { createAvatarLink } from "src/utils/createAvatarLink";
interface IContactsMarkup {
  imageUrl: string | null;
  defaultCharacter: number;
  name: string;
  id: string;
}
const ContactsMarkup = ({
  imageUrl,
  defaultCharacter,
  name,
}: IContactsMarkup) => (
  <ListItem sx={{ display: "flex" }}>
    <Avatar
      sx={{ width: 70, height: 70 }}
      src={createAvatarLink(imageUrl, defaultCharacter)}
      alt={name}
    />
    <Typography>{name}</Typography>
  </ListItem>
);

function Contacts() {
  //   const { data, isPending } = useGetUsers();
  //   if (isPending) return <Spinner />;
  //   if (!data) return;
  return (
    <Box>
      <Typography variant="h2">My friends ({data.total})</Typography>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {data.documents.map(({ $id: id, imageUrl, defaultCharacter, name }) => (
          <Link to={`/${id}`} key={id}>
            <ContactsMarkup
              imageUrl={imageUrl}
              defaultCharacter={defaultCharacter}
              name={name}
              id={id}
            />
            <Divider />
          </Link>
        ))}
      </List>
    </Box>
  );
}

export default Contacts;
