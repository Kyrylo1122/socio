export interface IUserNew {
  name: string;
  email: string;
  username: string;
  password: string;
  defaultCharacter: number;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
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
