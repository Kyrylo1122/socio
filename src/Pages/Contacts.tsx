import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AvatarImage from "src/Components/AvatarImage";
import Spinner from "src/Components/Spinner";
import { useUserContext } from "src/hooks/useUserContext";
import { useGetUsers } from "src/lib/react-query";
import { AvatarImageProps } from "src/types";

const ContactsMarkup = ({
  photoUrl,
  defaultCharacter,
  name,
}: AvatarImageProps) => (
  <ListItem sx={{ display: "flex" }}>
    <AvatarImage
      name={name}
      photoUrl={photoUrl}
      defaultCharacter={defaultCharacter}
      sx={{ width: 70, height: 70 }}
    />
    <Typography>{name}</Typography>
  </ListItem>
);

function Contacts() {
  const { data, isPending } = useGetUsers();
  const { user } = useUserContext();
  if (isPending) return <Spinner />;
  if (!data) return;
  const friends = data.filter((friend) => friend.uid !== user.uid);
  console.log("friends: ", friends);
  //   return <>COntacts</>;
  return (
    <Box>
      <Typography variant="h2">My friends ({friends.length})</Typography>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {friends.map(({ uid, photoUrl, defaultCharacter, name }) => {
          console.log({ photoUrl, defaultCharacter });
          return (
            <Link to={`/${uid}`} key={uid}>
              <ContactsMarkup
                photoUrl={photoUrl}
                defaultCharacter={defaultCharacter}
                name={name}
              />
              <Divider />
            </Link>
          );
        })}
      </List>
    </Box>
  );
}

export default Contacts;
