import { props } from "@/app/types";

export const ChatHead: React.FC<props> = ({ children, bgColor }) => {
  return (
    <div
      className={`h-14 rounded-t-3xl ${bgColor} flex gap-2 justify-center items-center border-b-2 border-white`}
    >
      {children}
    </div>
  );
};
