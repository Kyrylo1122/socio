export const INITIAL_USER = {
  $id: "",
  name: "",
  email: "",
  imageUrl: null,
  imageId: null,
  password: "",
  bio: "",
  defaultCharacter: 0,
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
