import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IUserNew } from "src/types";
import {
  createNewPost,
  createUserAccount,
  deleteFile,
  signInAccount,
  signOutAccount,
  updateFile,
  updateUserInfo,
  uploadFile,
} from "../api";

const useQueryUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    },
  });
};

const useCreateUserAccountMutation = () =>
  useMutation({
    mutationFn: (user: IUserNew) => createUserAccount(user),
  });

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

const useCreatePost = () => useMutation({ mutationFn: createNewPost });
const useUpdateUserInfo = () =>
  useMutation({ mutationFn: (data: any) => updateUserInfo(data) });

export {
  useCreatePost,
  useSignOutAccount,
  useQueryUser,
  useCreateUserAccountMutation,
  useSignInAccountMutation,
  useDeleteFile,
  useUploadFile,
  useUpdateUserInfo,
};
