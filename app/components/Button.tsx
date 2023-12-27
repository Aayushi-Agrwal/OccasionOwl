import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface PropsBox {
  name: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface PropsLink {
  name: string;
  href: Url;
}

interface PropsBoxChildren {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const LinkButton: React.FC<PropsLink> = ({ name, href }) => {
  return (
    <Link
      className="flex text-lg bg-violet-700 px-16 py-2 justify-center rounded-lg items-center transition hover:translate-y-0.5 cursor-pointer"
      href={href}
    >
      {name}
    </Link>
  );
};

export const BoxButton: React.FC<PropsBox> = ({ name, type, onClick }) => {
  return (
    <button
      className="h-12 w-full flex text-lg bg-violet-700 px-16 py-2 justify-center rounded-lg items-center transition hover:translate-y-0.5 cursor-pointer"
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export const BoxButtonWhite: React.FC<PropsBoxChildren> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="h-12 w-full flex gap-4 text-lg border-2 border-white py-2 justify-center rounded-lg items-center transition hover:translate-y-0.5 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
