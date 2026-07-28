import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatPane } from "./components/ChatPane";
import { JoinScreen } from "./components/JoinScreen";
import type { Message } from "./types/chat.types";
import connectWS from "./utils/ws";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const socket = useRef(null);
  // Mock state for the UI-only Ripple experience.
  const [displayName, setDisplayName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [popupJoinScreen, setPopupJoinScreen] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.current = connectWS();

    //Generate the new socket id for connection
    socket.current.on("connect", () => {
      socket.current.on("userJoinRoomNotify", (userName: string): void => {
        console.log(`${userName} joined the room`);
      });

      socket.current.on("msgSendNotify", (msg: Message): void => {
        //push to existing message list
        setMessages((prev) => [...prev, msg]);
        console.log(`Message from the server : ${msg}`);
      });
    });
  }, []);
  const handelSubmitJoinScreen = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimed = nameInput.trim();

    if (!trimed){
      toast.warning("Plese enter your name");
      return;
    } 
      
      //this .emit method is used to send msg in server when join room btn clicked
      socket.current.emit("joinRoom", trimed);
  
      setDisplayName(trimed);
      setPopupJoinScreen(false);



  };

  const handelSendMsg = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = messageText.trim();
    if (!trimmed) return;

    const nextMessage: Message = {
      id: Date.now(),
      sender: displayName,
      text: trimmed,
      time: new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
      // status: "sent",
    };

    //sending the socket msg into server through "sendMsg" event
    socket.current.emit("sendMsg", nextMessage);

    setMessages((current) => [...current, nextMessage]);
    setMessageText("");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {popupJoinScreen ? (
        <JoinScreen
          nameInput={nameInput}
          setNameInput={setNameInput}
          handelSubmitJoinScreen={handelSubmitJoinScreen}
        />
      ) : (  
        <div className="min-h-screen w-full bg-slate-950 text-slate-100">
          <div className="mx-auto flex min-h-screen max-w-[1560px] flex-col px-4 py-5 sm:px-6 lg:px-8">
            <div className="grid flex-1 gap-4 ">
              <ChatPane
                messages={messages}
                displayName={displayName}
                handelSendMsg={handelSendMsg}
                setMessageText={setMessageText}
                messageText={messageText}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
