"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect, useState } from "react";
import { ChatBox } from "./ChatBox";
import {
  faArrowRight,
  faEllipsisVertical,
  faMicrophone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "@/app/lib/firebase";

export const Chat = ({ name }: { name: string }) => {
  const [sendActive, setSendActive] = useState<boolean>(false);

  // show received messages ui
  const ReceivedMessages = ({
    key,
    message,
  }: {
    message: string;
    key: number;
  }) => {
    return (
      <div className="my-4">
        <p className="text-white mx-4 text-sm">Alex</p>
        <p
          key={key}
          className="bg-white text-black inline-block max-w-md rounded-2xl p-2 rounded-tl-none mx-4"
        >
          {message}
        </p>
      </div>
    );
  };

  // show sent messages ui
  const SentMessages = ({ key, message }: { message: any; key: number }) => {
    return (
      <div className="my-4 block ml-auto">
        <p
          key={key}
          className="bg-white text-black inline-block max-w-md rounded-2xl p-2 rounded-tr-none mx-4"
        >
          {message}
        </p>
      </div>
    );
  };

  // handle voice message/sent button
  function handleChange(e: { target: { value: string } }) {
    if (e.target.value) {
      setSendActive(true);
    } else {
      setSendActive(false);
    }
  }

  // add new message
  const addMessage = async (e: any) => {
    const newMessage: string = e.target.typeBox.value;
    e.preventDefault();

    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dateString =
      currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

    const timestamp = currentDate.toLocaleTimeString([], {
      timeStyle: "medium",
    });

    if (newMessage) {
      const newMessagRef = doc(collection(firestore, "messages"));
      try {
        const docRef = await setDoc(newMessagRef, {
          value: newMessage,
          createdAt: dateString + " " + timestamp,
        });
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      e.target.typeBox.value = "";
      setSendActive(false);
    }
  };

  // add new chat
  const addNewDoc = async (e: any) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, "messages"), {
        value: "Test message",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // show messages
  const useGetDocs = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const messagesRef = collection(firestore, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"), limit(25));

    useEffect(() => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newMessages = querySnapshot.docs.map((doc) => doc.get("value"));
        setMessages(newMessages);
      });

      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    }, [q]);

    return messages;
  };

  const messages = useGetDocs();

  const mapMessage = messages?.map((message, index) => {
    return <SentMessages key={index} message={message} />;
  });

  return (
    <ChatBox bgColor="from-[#403DC8] to-[#05045E]" width="w-7/12">
      <div className="h-14 rounded-t-3xl bg-[#403DC8] flex justify-between px-12 items-center">
        <p className="text-2xl">{name}</p>
        <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
      </div>
      <div className="flex flex-col absolute w-full top-14 bottom-16 overflow-scroll">
        {mapMessage}
      </div>
      <div className="h-16 bg-[#403DC8] absolute bottom-0 w-full flex items-center rounded-b-3xl">
        <form
          className="w-full flex gap-4 justify-center items-center"
          onSubmit={addMessage}
        >
          <button
            className="h-9 w-9 bg-white rounded-full"
            onClick={addNewDoc}
            type="button"
          >
            <FontAwesomeIcon
              className="text-gray-500"
              icon={faPlus}
              size="xl"
            />
          </button>
          <input
            className="w-5/6 rounded-lg h-8 placeholder:pl-2 text-gray-800 px-2"
            id="typeBox"
            name="typeBox"
            placeholder="Type a message..."
            onChange={handleChange}
          />
          <button className="h-9 w-9 bg-white rounded-full" type="submit">
            <FontAwesomeIcon
              className="text-gray-500"
              icon={sendActive ? faArrowRight : faMicrophone}
              size="xl"
            />
          </button>
        </form>
      </div>
    </ChatBox>
  );
};
