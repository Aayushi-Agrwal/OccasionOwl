"use client";

import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

export function withProtected(Component: any) {
  return function WithProtected(props: JSX.IntrinsicAttributes) {
    const router = useRouter();
    const [isUserValid, setIsUserValid] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setIsUserValid(true);
            console.log("This is the logged in user", user);
          } else {
            console.log("no user found");
            // const ShowComponent = () => {
            //   return <h1 className="bg-white text-lg">Loading</h1>;
            // };
            // <ShowComponent />;
            // setTimeout(() => {
            router.push("/auth");
            // }, 1000);
            return;
          }
        });
      };

      checkAuth();
    }, []);

    if (isUserValid) {
      return <Component auth={auth} {...props} />;
    }
  };
}
