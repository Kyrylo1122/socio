import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IUserNew, IUserResponse } from "src/types";
import {
  createNewPost,
  createUserAccount,
  deleteFile,
  deletePost,
  getPosts,
  likePost,
  signInAccount,
  signOutAccount,
  updateUserInfo,
  uploadFile,
  uploadComments,
} from "../api";
import { QUERY_KEYS } from "./QueryKeys";

const useGetPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],

    queryFn: getPosts,
  });

const useCreateUserAccountMutation = () => {
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

const useSignInAccountMutation = () =>
  useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
const useSignOutAccount = () =>
  useMutation({
    mutationFn: signOutAccount,
  });

const useDeleteFile = () =>
  useMutation({
    mutationFn: (id: string) => deleteFile(id),
  });

const useUploadFile = () => useMutation({ mutationFn: uploadFile });

const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
  });
};
const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
  });
};

const useUpdateUserInfo = () =>
  useMutation({
    mutationFn: (data: Partial<IUserResponse>) => updateUserInfo(data),
  });

const useLikePost = () => {
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
export const useUploadComments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userInfo) => uploadComments(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_COMMENTS],
      });
    },
  });
};

export {
  useDeletePost,
  useCreatePost,
  useSignOutAccount,
  useCreateUserAccountMutation,
  useSignInAccountMutation,
  useDeleteFile,
  useUploadFile,
  useUpdateUserInfo,
  useGetPosts,
  useLikePost,
};
