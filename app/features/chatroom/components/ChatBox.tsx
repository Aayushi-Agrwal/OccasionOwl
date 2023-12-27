import { props } from "@/app/types";

export const ChatBox: React.FC<props> = ({ children, bgColor, width }) => {
  return (
    <div
      className={`bg-gradient-to-r ${bgColor} ${width} relative m-4 rounded-3xl`}
    >
      {children}
    </div>
  );
};
