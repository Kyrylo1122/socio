import { SxProps, Theme } from "@mui/material";

export type CollectionNameType = "posts" | "users" | "userChats" | "chats";

export interface IUserNew {
  name: string;
  email: string;
  password: string;
  defaultCharacter: number;
}
export interface IUserShortInfo {
  displayName: string;
  defaultCharacter: number;
  photoUrl: null | string;
  uid: string;
}
export interface IUserChats {
  lastMessage?: { text: IText };
  userInfo?: IUserShortInfo;
  date?: Date;
}
interface IText {
  value: string;
}
export interface IMessage {
  id: string;
  text: IText;
  senderId?: string;
  date?: Date;
}
export interface IMessageResponse {
  date: { seconds: number; nanoseconds: number };
  id: string;
  senderId: string;
  text: IText;
}
export interface AvatarImageProps {
  photoUrl: string | null;
  defaultCharacter: number;
  name: string;
  sx?: SxProps<Theme>;
}

export interface IUser {
  backgroundImage: null | undefined;
  bio: string;
  city: string;
  country: string;
  defaultCharacter: number;
  email: string;
  name: string;
  photoUrl: null | string;
  uid: string;
  status: null | string;
}

export interface IUserInfo {
  key: string;
  value: string;
}
export interface IUserResponse {
  accountId?: string;
  $id: string;
  email: string;
  name: string;
  imageUrl: string | null;
  imageId: string | null;
  password: string;
  defaultCharacter: number;
  bio?: string | null;
  backgroundImage?: URL | null;
  userInfo?: string[];

  //   userInfo?: URL | null;
}

export interface IUserContext {
  user: IUser;
  friends: IUser[];
  isLoading?: boolean;
}

export interface INewPostForm {
  caption: string;
  photoUrl?: File | null;
  location?: string;
}
export interface INewPost {
  id: string;
  location: string;
  caption: string;
  tags: string[];
  photoUrl?: File | null;
  creator: IUserShortInfo;
  likes: string[];
  createdAt: Date;
}

interface IComment {
  name: string;
  imageUrl?: string | null;
  defaultCharacter: number;
  createdAt: DataTransfer;
  text: IText;
}
export interface ICreatePost {
  posts: {
    id: string;
    creator: IUser;
    caption?: string;
    imageUrl?: File;
    location?: string;
    tags: string[];
    likes: string[];
    createdAt: Date;
    comments: IComment[];
  };
}

export interface IPostResponse {
  $id: string;

  caption?: string;

  imageUrl: string | null;
  tags: string[];
  location?: string;
  imageId?: string;
  creator?: string;
  postCreator: string;
  likes: any;
  $createdAt: string;
  comments?: any;
}
export type ModeType = "light" | "dark";

export interface AvatarType {
  id: number;
  image: string;
  name: string;
}
export interface IFormNames {
  name: string;
  surname: string;
  email: string;
  password: string;
  comment: string;
}

export interface IDialogContext {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
}
