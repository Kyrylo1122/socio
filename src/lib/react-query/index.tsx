import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IPostResponse, IUser, IUserNew } from "src/types";

import { QUERY_KEYS } from "./QueryKeys";
import {
  createUserAccount,
  deleteAvatarImage,
  getAllUsers,
  getUserById,
  signInAccount,
  signOutAccount,
  updateDatabase,
  uploadAvatarImage,
} from "src/firebase/api-firebase";
import {
  createComment,
  createNewPost,
  deletePost,
  getSavePost,
  likePost,
  savePost,
  updatePost,
} from "../api";

export const useGetUserPosts = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],

    queryFn: () => getUserPosts(id),
  });

export const useDeleteFile = () =>
  useMutation({
    mutationFn: (id: string) => deleteFile(id),
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      arrayOfLikes,
    }: {
      postId: string;
      arrayOfLikes: string[];
    }) => likePost(postId, arrayOfLikes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      attribute,
    }: {
      postId: string;
      attribute: Partial<IPostResponse>;
    }) => updatePost(postId, attribute),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: { postId: string; userId: string; body: string }) =>
      createComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
  });
};
export const useSavePost = () =>
  useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      savePost(userId, postId),
  });

export const useGetSaves = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],

    queryFn: () => getSavePost(userId),
  });
//
// ===================================================
export const useGetUsers = (id: string | null | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],

    queryFn: () => getAllUsers(id),
    enabled: Boolean(id),
  });
export const useSignInAccount = () =>
  useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uid, data }: { uid: string; data: Partial<IUser> }) =>
      updateDatabase({ id: uid, collectionName: "users", data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useCreateUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUserNew) => createUserAccount(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CREATE_USER_ACCOUNT],
      });
    },
  });
};
export const useGetUsersById = (id: string | null | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, QUERY_KEYS.GET_CURRENT_USER, id],

    queryFn: () => getUserById(id),
    enabled: Boolean(id),
  });

export const useUploadAvatarImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      name,
      file,
    }: {
      id: string;
      name: string;
      file: File;
    }) => uploadAvatarImage(id, name, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useDeleteAvatarImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteAvatarImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useSignOutAccount = () =>
  useMutation({
    mutationFn: signOutAccount,
  });
