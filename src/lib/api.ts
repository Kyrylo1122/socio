import { INewPost, IPostResponse, IUserNew, IUserResponse } from "src/types";
import { account, appwriteConfig, databases, storage } from "./config";
import { ID, Query } from "appwrite";

export const createUserAccount = async ({
  name,
  email,
  password,
  defaultCharacter,
}: IUserNew) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw Error;

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      //   imageUrl: null,
      //   imageId: null,
      defaultCharacter: defaultCharacter ?? 0,
      password,
      //   userInfo: [],
      //   bio: null,
      //   backgroundImage: null,
    });

    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const signInAccount = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
  }
};
export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error(error);
  }
};

export const saveUserToDB = async (user: any) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserInfo = async (data: Partial<IUserResponse>) => {
  try {
    const currentUser = await getCurrentUserAccount();
    if (!currentUser) throw Error;

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentUser.$id,
      data
    );
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUserAccount = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error();

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
};

export async function createNewPost(post: INewPost) {
  try {
    let uploadedFile = null;
    let fileUrl = null;
    if (post.imageUrl) {
      uploadedFile = await uploadFile(post.imageUrl);
      if (!uploadedFile) throw Error;

      fileUrl = await getFilePreview(uploadedFile.id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.id);
        throw Error;
      }
    }

    // Create post
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile?.id,
        location: post.location,
        tags: post.tags,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageMediaId,
      ID.unique(),
      file
    );

    if (!uploadedFile) throw Error;
    const imageUrl = await getFilePreview(uploadedFile.$id);
    return { imageUrl, id: uploadedFile.$id };
  } catch (error) {
    console.error(error);
  }
};
export const uploadComments = async (userInfo: any) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageUserInfoId,
      ID.unique(),
      userInfo
    );

    if (!uploadedFile) throw Error;
    const infoUrl = await getFilePreview(uploadedFile.$id);
    return { infoUrl, id: uploadedFile.$id };
  } catch (error) {
    console.error(error);
  }
};

export const getFilePreview = async (id: string) => {
  try {
    const uploadedFile = await storage.getFilePreview(
      appwriteConfig.storageMediaId,
      id
    );
    if (!uploadedFile) throw Error;
    return uploadedFile;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFile = async (id: string) => {
  try {
    return await storage.deleteFile(appwriteConfig.storageMediaId, id);
  } catch (error) {
    console.error(error);
  }
};
export const getUserPosts = async (userId: string) => {
  try {
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal("creator", [userId]), Query.orderDesc("$createdAt")]
    );
  } catch (error) {
    console.error(error);
  }
};
export const deletePost = async (id: string) => {
  try {
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      id
    );
  } catch (error) {
    console.error(error);
  }
};
export const updatePost = async (
  postId: string,
  attribute: Partial<IPostResponse>
) => {
  console.log("attribute: ", attribute);
  try {
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      { ...attribute }
    );
  } catch (error) {
    console.error(error);
  }
};
export const likePost = async (postId: string, arrayOfLikes: string[]) => {
  try {
    return await updatePost(postId, { likes: arrayOfLikes });
  } catch (error) {
    console.error(error);
  }
};
export const createComment = async (
  postId: string,
  arrayOfComments: string[]
) => {
  try {
    return await updatePost(postId, { comments: arrayOfComments });
  } catch (error) {
    console.error(error);
  }
};
export async function getUsers() {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.error(error);
  }
}
export const savePost = async (userId: string, postId: string) => {
  try {
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const getSavePost = async (userId: string) => {
  try {
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      [Query.equal("user", [userId]), Query.orderDesc("$createdAt")]
    );
  } catch (error) {
    console.error(error);
  }
};

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
// export async function createUserAccount(user: any) {
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       user.email,
//       user.password,
//       user.name
//     );

//     if (!newAccount) throw Error;

//     const newUser = await saveUserToDB({
//       accountId: newAccount.$id,
//       name: newAccount.name,
//       email: newAccount.email,
//       defaultCharacter: 1,
//       password: user.password,
//     });

//     return newUser;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// ============================== SAVE USER TO DB
// export async function saveUserToDB(user: {
//   accountId: string;
//   email: string;
//   name: string;
//   defaultCharacter: number;
//   password: string;
// }) {
//   try {
//     const newUser = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       ID.unique(),
//       user
//     );

//     return newUser;
//   } catch (error) {
//     console.log(error);
//   }
// }

// ============================== SIGN IN
// export async function signInAccount(user: { email: string; password: string }) {
//   try {
//     const session = await account.createEmailSession(user.email, user.password);

//     return session;
//   } catch (error) {
//     console.log(error);
//   }
// }

// ============================== GET ACCOUNT

// ============================== GET USER
// export async function getCurrentUser() {
//   try {
//     const currentAccount = await getAccount();

//     if (!currentAccount) throw Error;

//     const currentUser = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("accountId", currentAccount.$id)]
//     );

//     if (!currentUser) throw Error;

//     return currentUser.documents[0];
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// ============================== SIGN OUT

// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST

// ============================== GET FILE URL

// ============================== DELETE FILE

// ============================== GET POSTS

// ============================== DELETE POST
