import { INewPost, IUserNew } from "src/types";
import { account, appwriteConfig, databases, storage } from "./config";
import { ID, Query } from "appwrite";

const createUserAccount = async ({
  name,
  email,
  password,
  username,
  defaultCharacter,
}: IUserNew) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw Error;

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: null,
      defaultCharacter,
      username,
      password,
    });
    return newUser;
  } catch (error) {
    console.error(error);
  }
};
const signInAccount = async ({
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
    console.error(error);
  }
};
const signOutAccount = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error(error);
  }
};

const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL | null;
  username: string;
  password: string;
  defaultCharacter: number;
}) => {
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

const getCurrentUserAccount = async () => {
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

async function createNewPost(post: INewPost) {
  try {
    let uploadedFile = null;
    let fileUrl = null;
    if (post.imageUrl) {
      uploadedFile = await uploadFile(post.imageUrl);
      if (!uploadedFile) throw Error;

      fileUrl = await getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile?.$id,
        location: post.location,
        tags: tags,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
export {
  createUserAccount,
  signInAccount,
  saveUserToDB,
  getCurrentUserAccount,
  signOutAccount,
  createNewPost,
};
const uploadFile = async (file: File) => {
  try {
    const post = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    if (!post) throw Error;
    return post;
  } catch (error) {
    console.error(error);
  }
};

const getFilePreview = async (id: string) => {
  try {
    const uploadedFile = await storage.getFilePreview(
      appwriteConfig.storageId,
      id
    );
    if (!uploadedFile) throw Error;
    return uploadedFile;
  } catch (error) {
    console.error(error);
  }
};

const deleteFile = async (id: string) => {
  try {
    return await storage.deleteFile(appwriteConfig.storageId, id);
  } catch (error) {
    console.error();
  }
};
// import { ID, Query } from "appwrite";

// import { appwriteConfig, account, databases, avatars } from "./config";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
// export async function createUserAccount(user: IUserNew) {
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       user.email,
//       user.password,
//       user.name
//     );

//     if (!newAccount) throw Error;

//     const avatarUrl = avatars.getInitials(user.name);

//     const newUser = await saveUserToDB({
//       accountId: newAccount.$id,
//       name: newAccount.name,
//       email: newAccount.email,
//       username: user.username,
//       imageUrl: avatarUrl,
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
//   imageUrl: URL;
//   username?: string;
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
// export async function getAccount() {
//   try {
//     const currentAccount = await account.get();

//     return currentAccount;
//   } catch (error) {
//     console.log(error);
//   }
// }

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
