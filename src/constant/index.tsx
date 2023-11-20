import { avatars } from "src/Components/ProfileAvatars/ProfilePictures";

export const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  imageUrl: "",
  bio: "",
  defaultCharacter: avatars[0],
  userInfo: [],
};

export const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsLoading: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};
