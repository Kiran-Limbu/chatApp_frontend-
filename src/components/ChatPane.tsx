import { MessageBubble } from "./MessageBubble";
import type { Message } from "../types/chat.types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatPaneProps {
  messages: Message[];
  setDisplayName: (value: string) => void;
  displayName: string;
  handelSendMsg: (event: any) => void;
  setMessageText: (value: string) => void;
  messageText: string;
  typingNotify: string[];
}

export function ChatPane({
  messages,
  setDisplayName,
  displayName,
  handelSendMsg,
  setMessageText,
  messageText,
  typingNotify,
}: ChatPaneProps) { 

  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("info");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDisplayName(user?.userName);
      setImgUrl(user?.avatar);
    }
  }, []);

  const handelLogout = () =>{
    localStorage.removeItem("info");
    navigate("/");
  }
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/90 px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="flex min-w-0 items-center gap-3">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={`${displayName || "User"}'s avatar`}
                className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-cyan-400/30"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xl font-semibold text-cyan-300">
                {displayName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-slate-100 sm:text-lg">
                Default group name
              </p>
              <p className="truncate text-xs text-slate-400">Active room</p>
            </div>
          </div>

          <div className="col-span-2 row-start-2 min-h-5 text-center sm:col-span-1 sm:col-start-2 sm:row-start-1">
            {typingNotify.length > 0 && (
              <p className="text-xs font-semibold text-slate-400 sm:text-sm">
                {typingNotify.join(", ")} is typing ...
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="max-w-32 truncate capitalize text-sm font-semibold text-white">
                {displayName || "User"}
              </p>
              <p className="text-xs font-semibold text-slate-400">Online</p>
            </div>
            <button
              type="button"
              onClick={handelLogout}
              className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-rose-400/50 hover:bg-rose-500/10 hover:text-rose-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 sm:px-4 sm:text-sm"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-end justify-center pb-4">
            <p className="text-center text-xl font-semibold text-slate-400">
              Start your new conversation :
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-4xl flex-col gap-4 pb-4">
            {messages.map((message, indx) => (
              <div key={indx}>
                <MessageBubble
                  key={message.id}
                  message={message}
                  isMine={message.sender === displayName}
                  showSender={message.sender !== displayName}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-slate-800 bg-slate-950/95 px-4 py-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-4xl justify-center">
          <form
            onSubmit={handelSendMsg}
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
          >
            <label className="sr-only" htmlFor="messageInput">
              Write a message
            </label>
            <input
              id="messageInput"
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              placeholder="Write your message..."
              className="flex-1 rounded-3xl border border-slate-700 bg-slate-900 px-4 py-4 text-sm text-slate-100 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center rounded-3xl bg-cyan-500 px-7 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
