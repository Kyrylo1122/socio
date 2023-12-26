import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IPostResponse, IUserNew, IUserResponse } from "src/types";

import { QUERY_KEYS } from "./QueryKeys";
import { createUserAccount, signInAccount } from "src/firebase/api-firebase";
import {
  createComment,
  createNewPost,
  deletePost,
  getSavePost,
  getUsers,
  likePost,
  savePost,
  signOutAccount,
  updatePost,
  updateUserInfo,
  uploadFile,
} from "../api";
export const useGetUsers = () =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],

    queryFn: getUsers,
  });
export const useGetUsersById = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID],

    queryFn: () => getUserById(id),
  });
export const useGetUserPosts = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],

    queryFn: () => getUserPosts(id),
  });

export const useSignOutAccount = () =>
  useMutation({
    mutationFn: signOutAccount,
  });

export const useDeleteFile = () =>
  useMutation({
    mutationFn: (id: string) => deleteFile(id),
  });

export const useUploadFile = () => useMutation({ mutationFn: uploadFile });

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

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<IUserResponse>) => updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
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
// ===================================================
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

export const useSignInAccount = () =>
  useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
