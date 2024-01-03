import { CollectionNameType, IUser, IUserNew } from "src/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db, storage } from "./config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const getAllUsers = async (id: string | null | undefined) => {
  try {
    if (!id) throw Error;

    const q = query(collection(db, "users"), where("uid", "!=", id));

    const docSnap = await getDocs(q);
    const users = docSnap.docs.map((doc) => {
      return doc.data();
    });

    return users;
  } catch (error) {
    console.error(error);
  }
};
export const getUserById = async (id: string | null | undefined) => {
  try {
    if (!id) throw Error;
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw Error;
    return docSnap.data() as IUser;
  } catch (error) {
    console.error(error);
  }
};
export const getUserMessagesById = async (id: string | null | undefined) => {
  try {
    if (!id) throw Error;
    const docRef = doc(db, "userChats", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw Error;
    return docSnap.data();
  } catch (error) {
    console.error(error);
  }
};

export const updateChats = async (chatId: string, data) => {
  try {
    await updateDatabase({ id: chatId, collectionName: "userChats", data });
  } catch (error) {
    console.error(error);
  }
};

export const updateDatabase = async ({
  id,
  collectionName,
  data,
}: {
  id: string;
  collectionName: CollectionNameType;
  data: Partial<IUser>;
}) => {
  try {
    await setDoc(doc(db, collectionName, id), data, { merge: true });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const createUserAccount = async ({
  name,
  email,
  password,
  defaultCharacter,
}: IUserNew) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    if (!user) throw Error;
    await updateDatabase({
      id: user.uid,
      collectionName: "users",
      data: {
        uid: user.uid,
        name,
        email,
        defaultCharacter: defaultCharacter ?? 0,
        bio: "Welcome on my page",
        backgroundImage: null,
        country: "",
        city: "",
        photoUrl: null,
        status: null,
      },
    });
    await updateDatabase({
      id: user.uid,
      collectionName: "userChats",
      data: {},
    });
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
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    if (!user) throw Error;
  } catch (error) {
    console.error(error);
  }
};
export const signOutAccount = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const uploadAvatarImage = async (
  id: string,
  name: string,
  file: File
) => {
  const storageRef = ref(storage, name);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.error(error);
    },
    async () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      return await updateDatabase({
        id,
        collectionName: "users",
        data: {
          photoUrl: downloadURL,
        },
      });
    }
  );
};
export const deleteAvatarImage = async (id: string) => {
  try {
    return await updateDatabase({
      id,
      collectionName: "users",
      data: {
        photoUrl: null,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
