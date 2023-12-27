interface boxProps {
  children?: React.ReactNode;
  title?: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

interface selectedBoxProps {
  children?: React.ReactNode;
  title?: string;
  bgColor: string;
  textSize?: string;
}

export const Box: React.FC<boxProps> = ({ children, title, onClick }) => {
  return (
    <div
      className="h-12 border-b-2 border-white flex justify-center items-center hover:backdrop-sepia-0 hover:bg-white/10"
      onClick={onClick}
    >
      {children}
      {title && <div className="w-1/2 text-left">{title}</div>}
    </div>
  );
};

export const SelectedBox: React.FC<selectedBoxProps> = ({
  children,
  title,
  bgColor,
  textSize,
}) => {
  return (
    <div
      className={`h-12 border-b-2 border-white flex justify-center items-center ${bgColor}`}
    >
      {children}
      {title && <div className={`w-1/2 text-left ${textSize}`}>{title}</div>}
    </div>
  );
};
