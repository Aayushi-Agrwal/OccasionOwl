"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Box, SelectedBox } from "@/app/components/Box";
import { useEffect, useState } from "react";
import { events } from "@/app/constants/events";
import useFirebaseUser from "@/app/hooks/useFirebaseUser";
import { EventsChat } from "./components/EventsChat";
import { TeamsChat } from "./components/TeamsChat";
import { Chat } from "./components/Chat";

interface chatName {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}
export default function ChatRoom() {
  const [team, setTeam] = useState("");
  const [event, setEvent] = useState(events[0].name);
  const { logout } = useFirebaseUser();

  const mapEventName = events.map(
    (eventData: { name: string }, key: number) => {
      return (
        <div key={key}>
          {event === eventData.name ? (
            <SelectedBox bgColor="bg-[#9076F8]">
              <FontAwesomeIcon icon={faCircle} size="2xl" />
            </SelectedBox>
          ) : (
            <Box
              onClick={() => {
                setEvent(eventData.name), setTeam("");
              }}
            >
              <FontAwesomeIcon icon={faCircle} size="2xl" />
            </Box>
          )}
        </div>
      );
    }
  );

  const mapTeamName = events.map(
    (eventData: { name: string; teams: string[] }, key: number) => {
      const mapTeam = eventData.teams.map((teamName: string, key: number) => {
        return (
          <>
            {eventData.name === event && (
              <div key={key}>
                {team === teamName ? (
                  <SelectedBox title={teamName} bgColor="bg-[#351D96]" />
                ) : (
                  <Box title={teamName} onClick={() => setTeam(teamName)} />
                )}
              </div>
            )}
          </>
        );
      });
      return <div key={key}>{mapTeam}</div>;
    }
  );

  const mapOtherTeamName = events.map(
    (eventData: { name: string; otherTeams: string[] }, key: number) => {
      const mapTeam = eventData.otherTeams.map(
        (teamName: string, key: number) => {
          return (
            <>
              {eventData.name === event && (
                <div key={key}>
                  {team === teamName ? (
                    <SelectedBox title={teamName} bgColor="bg-[#351D96]" />
                  ) : (
                    <Box title={teamName} onClick={() => setTeam(teamName)} />
                  )}
                </div>
              )}
            </>
          );
        }
      );
      return <div key={key}>{mapTeam}</div>;
    }
  );

  return (
    // <div className="h-screen w-screen flex justify-center items-center before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:absolute before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
    //   just a test page
    // </div>
    <div className="bg-[#463C72] h-screen w-screen flex justify-around cursor-default">
      <p onClick={logout}>Logout</p>
      <EventsChat>{mapEventName}</EventsChat>
      <TeamsChat
        eventName={event}
        childrenOtherTeams={mapOtherTeamName}
        childrenTeams={mapTeamName}
      />
      <Chat name={team} />
    </div>
  );
}
