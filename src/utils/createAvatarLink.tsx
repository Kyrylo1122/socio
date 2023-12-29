import { avatars } from "src/Components/ProfileAvatars/ProfilePictures";

export const createAvatarLink = ({
  photoUrl,
  defaultCharacter,
}: {
  photoUrl: string | null | undefined;
  defaultCharacter: number;
}) => {
  return photoUrl ? photoUrl : avatars[defaultCharacter].image;
};
