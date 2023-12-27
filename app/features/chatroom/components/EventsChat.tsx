import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChatBox } from "./ChatBox";
import { ChatHead } from "./ChatHead";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { SelectedBox } from "@/app/components/Box";

export const EventsChat = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatBox bgColor="from-[#C081D7] to-[#9076F8]" width="w-1/12">
      <ChatHead bgColor="bg-[#B275C8]">
        <FontAwesomeIcon icon={faUserCircle} size="xl" className="mr-3" />
        XUser
      </ChatHead>
      {children}

      {/* Direct Messages */}
      <div className="mt-12 border-t-2 border-white">
        <SelectedBox bgColor="bg-[#9076F8]">
          <p className="text-sm">Direct Messages</p>
        </SelectedBox>
        {/* <Box title="Shubhi" onClick={onClick} />
          <Box title="Alex" onClick={onClick} /> */}
      </div>
    </ChatBox>
  );
};
