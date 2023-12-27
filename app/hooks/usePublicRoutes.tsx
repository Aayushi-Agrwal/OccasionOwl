"use client";

import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

export function withPublic(Component: any) {
  return function WithProtected(props: JSX.IntrinsicAttributes) {
    const router = useRouter();
    const [isUserInValid, setIsUserInValid] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        auth.onAuthStateChanged((user) => {
          if (!user) {
            setIsUserInValid(true);
            console.log("no user found");
          } else {
            console.log("This is the logged in user", user);
            router.push("/app/chatroom");
          }
        });
      };

      checkAuth();
    }, []);

    if (isUserInValid) {
      return <Component auth={auth} {...props} />;
    }
  };
}
