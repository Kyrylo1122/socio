import { SxProps, Theme } from "@mui/material";

export type CollectionNameType = "users" | "userChats" | "chats";

export interface IUserNew {
  name: string;
  email: string;
  password: string;
  defaultCharacter: number;
}
export interface IChatUserInfo {
  displayName: string;
  defaultCharacter: number;
  photoURL: null | string;
  uid: string;
}
export interface IUserChats {
  lastMessage?: { text: { value: string } };
  userInfo?: IChatUserInfo;
  date?: Date;
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

export interface INewPost {
  userId: string;
  caption?: string;
  imageUrl?: File;
  location?: string;
  tags?: string[];
}
export type CreatePostFormType = Omit<INewPost, "userId">;

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
