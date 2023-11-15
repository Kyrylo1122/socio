import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IUserNew } from "src/types";
import {
  createNewPost,
  createUserAccount,
  signInAccount,
  signOutAccount,
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

const useCreatePost = () => useMutation({ mutationFn: createNewPost });
export {
  useCreatePost,
  useSignOutAccount,
  useQueryUser,
  useCreateUserAccountMutation,
  useSignInAccountMutation,
};
