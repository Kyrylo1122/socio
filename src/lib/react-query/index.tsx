import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IComment,
  INewPost,
  IPostResponse,
  IUser,
  IUserChats,
  IUserNew,
} from "src/types";

import { QUERY_KEYS } from "./QueryKeys";
import {
  createNewPost,
  createUserAccount,
  deleteAvatarImage,
  deletePost,
  getAllUsers,
  getUserById,
  getUserMessagesById,
  getUserPosts,
  signInAccount,
  signOutAccount,
  updateChats,
  updateDatabase,
  updateUserChats,
  uploadAvatarImage,
  createComment,
  createPostReaction,
  getPostReactions,
  toggleLikes,
  deleteComment,
  addSaves,
  deleteSaves,
  getSaves,
} from "src/firebase/api-firebase";
import { FieldValue } from "firebase/firestore";

export const useDeleteFile = () =>
  useMutation({
    mutationFn: (id: string) => deleteFile(id),
  });

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      arrayOfLikes,
    }: {
      postId: string;
      arrayOfLikes: FieldValue;
    }) => toggleLikes(postId, arrayOfLikes),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_COMMENTS],
      });
    },
  });
};

// export const useUpdatePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({
//       postId,
//       attribute,
//     }: {
//       postId: string;
//       attribute: Partial<IPostResponse>;
//     }) => updatePost(postId, attribute),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
//     },
//   });
// };

//
// ===================================================
export const useGetSaves = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_SAVES, userId],

    queryFn: () => getSaves(userId),
    enabled: Boolean(userId),
  });
export const useGetPostReactions = (postId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_POST_COMMENTS, postId],

    queryFn: () => getPostReactions(postId),
    enabled: Boolean(postId),
  });

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
export const useUpdateUserChats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUserChats }) =>
      updateUserChats(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MESSAGES],
      });
    },
  });
};
export const useGetUserPosts = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS, id],

    queryFn: () => getUserPosts(id),
  });
export const useCreatePostReaction = () =>
  useMutation({
    mutationFn: ({ postId }: { postId: string }) => createPostReaction(postId),
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
      file,
    }: {
      id: string;
      data: INewPost;
      file: File | undefined | null;
    }) => createNewPost(id, data, file),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, post }: { id: string; post: IPostResponse }) =>
      deletePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
    },
  });
};
export const useAddSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, post }: { userId: string; post: IPostResponse }) =>
      addSaves(userId, post),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_SAVES] });
    },
  });
};

export const useDeleteSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, post }: { userId: string; post: IPostResponse }) =>
      deleteSaves(userId, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_SAVES] });
    },
  });
};
export const useUpdateChats = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { messages: FieldValue | [] };
    }) => updateChats(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MESSAGES],
      });
    },
  });
};

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
export const useGetUserMessages = (id: string | null | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGES, id],

    queryFn: () => getUserMessagesById(id),
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

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: IComment }) =>
      createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_COMMENTS],
      });
    },
  });
};
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: IComment }) =>
      deleteComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_COMMENTS],
      });
    },
  });
};
