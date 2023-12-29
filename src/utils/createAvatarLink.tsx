import { avatars } from "src/Components/ProfileAvatars/ProfilePictures";

export const createAvatarLink = (
  imageUrl: string | null | undefined,
  defaultCharacter: number
) => (imageUrl ? imageUrl : avatars[defaultCharacter].image);
