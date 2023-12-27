import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChatBox } from "./ChatBox";
import { ChatHead } from "./ChatHead";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { SelectedBox } from "@/app/components/Box";

export const TeamsChat = ({
  childrenTeams,
  childrenOtherTeams,
  eventName,
}: {
  childrenTeams: React.ReactNode;
  childrenOtherTeams: React.ReactNode;
  eventName: string;
}) => {
  return (
    <ChatBox bgColor="from-[#9076F8] to-[#403DC8]" width="w-3/12">
      <ChatHead bgColor="bg-[#7151F0]">
        <FontAwesomeIcon icon={faUserCircle} size="2xl" />
        <p className="text-xl">{eventName}</p>
      </ChatHead>

      {childrenTeams}

      {/* Other Teams */}
      <div className="mt-12 border-t-2 border-white">
        <SelectedBox
          bgColor="bg-[#9076F8]"
          title="Other Teams"
          textSize="text-2xl"
        />
        {childrenOtherTeams}
      </div>
    </ChatBox>
  );
};
