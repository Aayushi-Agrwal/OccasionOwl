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
} from "firebase/firestore";
import { firestore } from "@/app/lib/firebase";
// import { collection } from "firebase/firestore";
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import { firestore } from "@/app/lib/firebase";

export const Chat = ({ name }: { name: string }) => {
  const [sendActive, setSendActive] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  // const messagesRef = collection(firestore, "messages");
  // const q = query(messagesRef, orderBy("createdAt"), limit(25));
  // const querySnapshot = getDocs(q);
  // const [messages] =
  // const [messages, setMessages] = useState<{ id: string }[]>();
  const useGetDocs = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const messagesRef = collection(firestore, "messages");
    const q = query(messagesRef, orderBy("createdAt"), limit(25));

    useEffect(() => {
      const getDocuments = async () => {
        const data = await getDocs(q);
        setMessages(data.docs.map((doc) => doc.get("value")));
      };

      getDocuments();
    }, []);

    return messages;
  };

  const messages = useGetDocs();
  // useEffect(() => {
  //   const viewDoc = async () => {
  //     const messagesRef = collection(firestore, "messages");
  //     const q = query(messagesRef, orderBy("createdAt"), limit(25));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       const newMessage = doc.get("value");
  //       setMessages((current) => [...current, newMessage]);
  //     });
  //     console.log(messages);
  //     setShowMessage(false);
  //   };

  //   viewDoc();
  // }, []);

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

  function handleChange(e: { target: { value: string } }) {
    if (e.target.value) {
      setSendActive(true);
    } else {
      setSendActive(false);
    }
  }

  // function addMessage(e: any) {
  //   e.preventDefault();
  //   const newMessage: string = e.target.typeBox.value;
  //   setMessages((current) => [...current, newMessage]);
  //   e.target.typeBox.value = "";
  //   setSendActive(false);
  // }

  const mapMessage = messages?.map((message, index) => {
    return <SentMessages key={index} message={message} />;
  });

  return (
    <ChatBox bgColor="from-[#403DC8] to-[#05045E]" width="w-7/12">
      <div className="h-14 rounded-t-3xl bg-[#403DC8] flex justify-between px-12 items-center">
        <p className="text-2xl">{name}</p>
        <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
      </div>
      <div className="flex flex-col">{mapMessage}</div>
      <div className="h-16 bg-[#403DC8] absolute bottom-0 w-full flex items-center rounded-b-3xl">
        <form
          className="w-full flex gap-4 justify-center items-center"
          // onSubmit={addMessage}
        >
          <button className="h-9 w-9 bg-white rounded-full" onClick={addNewDoc}>
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
