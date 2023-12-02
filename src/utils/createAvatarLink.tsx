import { avatars } from "src/Components/ProfileAvatars/ProfilePictures";

export const createAvatarLink = (
  imageUrl: string | null,
  defaultCharacter: number
) => (imageUrl ? imageUrl : avatars[defaultCharacter].image);
