export interface IUserNew {
  name: string;
  email: string;
  password: string;
  defaultCharacter: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  bio: string;
  backgroundImage?: string | null;
  defaultCharacter: AvatarType;
  userInfo: IUserInfo[];
  imageId?: string | null;
}

export interface IUserInfo {
  key: string;
  value: string;
}
export interface IUserResponse {
  accountId?: string;
  id?: string;
  email: string;
  name: string;
  imageUrl: URL | null;
  imageId: string | null;
  password: string;
  defaultCharacter: number;
  bio?: string | null;
  userInfo: IUserInfo[];
  backgroundImage?: URL | null;
}

export interface IUserContext {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (state: IUser) => void;
  setIsAuthenticated: (state: boolean) => void;
  checkAuthUser: () => Promise<boolean | undefined>;
}

export interface INewPost {
  userId: string;
  caption?: string;
  imageUrl?: any;
  location?: string;
  tags?: string;
}
export type ModeType = "light" | "dark";

export interface AvatarType {
  id: number;
  image: string;
  name: string;
}
