"use client";

import { BoxButton, BoxButtonWhite } from "@/app/components/Button";
import { InputField, InputFieldPassword } from "@/app/components/Input";
import useFirebaseUser from "@/app/hooks/useFirebaseUser";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

interface props {
  title: string;
  buttonTitle: string;
  message: string;
  messageAction: string;
  action: (
    e: {
      preventDefault: () => void;
    },
    email: string,
    password: string
  ) => Promise<void>;
}

export const LoginForm: React.FC<props> = ({
  title,
  buttonTitle,
  message,
  messageAction,
  action,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { googleLogin } = useFirebaseUser();

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <h1 className="text-2xl tracking-wider pb-8">{title}</h1>
      <form className="flex flex-col gap-6 items-center justify-center">
        <div className="relative group">
          <InputField
            id="email"
            name="email"
            label="Email address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative group">
          <InputFieldPassword
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <BoxButton
          type="submit"
          name={buttonTitle}
          onClick={(e) => action(e, email, password)}
        />
      </form>
      <p className="pt-4">
        {message}
        <Link className="text-violet-300" href="/auth">
          {messageAction}
        </Link>
      </p>
      <div className="flex gap-6 flex-col items-center justify-center">
        <div className="relative flex pt-6 items-center w-[20rem]">
          <div className="flex-grow border-t border-white"></div>
          <span className="flex-shrink mx-4 text-white">OR</span>
          <div className="flex-grow border-t border-white"></div>
        </div>

        <BoxButtonWhite onClick={googleLogin}>
          <FontAwesomeIcon icon={faGoogle} /> Continue with Google
        </BoxButtonWhite>
      </div>
    </div>
  );
};
