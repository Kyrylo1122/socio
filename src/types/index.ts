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
  user: IUserResponse;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (state: IUserResponse) => void;
  setIsAuthenticated: (state: boolean) => void;
  setIsLoading: (state: boolean) => void;
  checkAuthUser: () => Promise<boolean | undefined>;
}

export interface INewPost {
  userId: string;
  caption?: string;
  imageUrl?: File;
  location?: string;
  tags?: string;
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
