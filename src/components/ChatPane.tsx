import { MessageBubble } from "./MessageBubble";
import type { Message } from "../types/chat.types";

interface ChatPaneProps {
  messages: Message[];
  displayName: string;
  handelSendMsg: (event: any) => void;
  setMessageText: (value: string) => void;
  messageText: string;
  typingNotify: string[];
}

export function ChatPane({
  messages,
  displayName,
  handelSendMsg,
  setMessageText,
  messageText,
  typingNotify
}: ChatPaneProps) {
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/90 px-4 py-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex justify-center items-center gap-2 min-w-0">
              <div className="flex text-xl font-semibold h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
                {displayName.charAt(0).toUpperCase() || "U"}
              </div>
              <p className="text-xl font-semibold text-slate-100">Default group name</p>
              <br />
            </div>
            <div className="px-[40px]">
              {typingNotify.length ? (
                <p className="text-sm font-semibold text-slate-400">{typingNotify.join(", ")} is typing ...</p>
              ) : ""}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="min-w-0 text-right">
              <p className="truncate capitalize text-xl font-semibold text-white">{displayName}</p>
              <p className="text-xs font-semibold text-slate-400">Joined the room</p>
            </div>
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
