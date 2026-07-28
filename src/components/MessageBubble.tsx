import type { Message } from "../types/chat.types";

type MessageBubbleProps = {
  message: Message;
  isMine: boolean;
  showSender?: boolean;
};

export function MessageBubble({ message, isMine, showSender = false }: MessageBubbleProps) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[78%] space-y-2 ${isMine ? "text-right" : "text-left"}`}>
        {showSender ? (
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            {message.sender}
          </p>
        ) : null}
        <div
          className={`relative rounded-[28px] border px-5 py-4 text-sm leading-6 ${
            isMine
              ? "rounded-br-[4px] rounded-tl-[28px] rounded-tr-[28px] rounded-bl-[28px] bg-cyan-500 text-white shadow-xl border-cyan-600"
              : "rounded-bl-[4px] rounded-tr-[28px] rounded-tl-[28px] rounded-br-[28px] bg-slate-800 text-slate-100 border-slate-700"
          }`}
        >
          <p>{message.text}</p>
          <div className="mt-3 flex items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-[0.24em]">
            <span className={`${isMine ? "text-cyan-100" : "text-slate-400"}`}>
              {message.time}
            </span>
           
          </div>
        </div>
      </div>
    </div>
  );
}
