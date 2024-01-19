export const USER_INITIAL = {
  defaultCharacter: 0,
  name: "",
  photoUrl: null,
  uid: "",
};
export const CURRENT_USER_INITIAL = {
  backgroundImage: null,
  bio: "",
  city: "",
  country: "",
  defaultCharacter: 0,
  email: "",
  name: "",
  photoUrl: null,
  uid: "",
  status: null,
};

export const CHAT_INITIAL_STATE = {
  data: { chatId: "", user: USER_INITIAL },
  dispatch: () => null,
};

export const DIALOG_INITIAL_STATE = {
  isVisibleChatBtn: true,
  setIsVisibleBtn: () => {},
  setIsInvisibleBtn: () => {},
  isOpen: true,
  close: () => {},
  open: () => {},
  toggle: () => {},
};
export const SAVES_INITIAL_STATE = {
  posts: [],
};
