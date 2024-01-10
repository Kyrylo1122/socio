export const USER_INITIAL = {
  defaultCharacter: 0,
  displayName: "",
  photoUrl: null,
  uid: "",
};

export const CHAT_INITIAL_STATE = {
  data: { chatId: "", user: USER_INITIAL },
  dispatch: () => null,
};

export const DIALOG_INITIAL_STATE = {
  isOpen: true,
  close: () => {},
  open: () => {},
  toggle: () => {},
};
