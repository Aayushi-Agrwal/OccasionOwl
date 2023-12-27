"use client";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

const provider = new GoogleAuthProvider();

export default function useFirebaseUser() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const router = useRouter();

  const login = async (
    e: { preventDefault: () => void },
    email: string,
    password: string
  ) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any }) => {
        // Signed in
        const user = userCredential.user;
        router.push("/app/chatroom");
        console.log(user);
      })
      .catch((error: { code: any; message: any }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return null;
      });
  };

  const googleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        router.push("/app/chatroom");
        console.log(user, token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        return null;
      });
  };

  const signup = async (
    e: { preventDefault: () => void },
    email: string,
    password: string
  ) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any }) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/app/chatroom");
        // ...
      })
      .catch((error: { code: any; message: any }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return null;
      });
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/auth");
        console.log("Signed out successfully");
        setUser(null);
      })
      .catch((error: { code: any; message: any }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return null;
      });
  };

  return { user, login, googleLogin, signup, logout };
}
