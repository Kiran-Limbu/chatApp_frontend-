# Mero Chat — Frontend Architecture

This file explains the code structure, how components connect, key functions, and where to add API/WebSocket calls when you wire the UI to a backend.

## Quick Start

- Install deps: `npm install`
- Run dev server: `npm run dev`

## Layout overview

- `src/App.tsx` — top-level container (state orchestration). Holds the mock conversation state and coordinates actions (open chat, send message, create conversation). Replace mock state updates with API calls here.
- `src/utils/chat.ts` — mock data, helper functions (id generation, initials, color/gradient utilities) and the canonical data shape used across components.
- `src/components/JoinScreen.tsx` — simple entry form where user types a display name. On submit it calls `submitJoin()` in `App.tsx`.
- `src/components/ChatSidebar.tsx` — sidebar list of conversations, search, filter tabs, and inline new-chat panel. Calls back into `App.tsx` via `openChat()` and `createNewConversation()`.
- `src/components/ChatPane.tsx` — main chat area: header (room info), message list, typing indicator, and message input form. Message submission triggers `handleSubmitMessage()` in `App.tsx`.
- `src/components/MessageBubble.tsx` — pure rendering of a single message bubble (sent vs received, timestamp, read indicator). In group chats it displays sender name with consistent color.
- `src/index.css` and `tailwind.config.js` — global styling and Tailwind utilities used by components.

## Data shape

The mock conversation shape is defined in `src/utils/chat.ts` and mirrors how you'd store documents in MongoDB:

```js
{
	id: string,
	type: 'direct' | 'group',
	name: string,
	online?: boolean,       // direct chats
	members?: string[],     // group chats
	unread: number,
	messages: [
		{ id, sender, text, time, status? }
	]
}
```

Keep server models compatible with this shape for smooth integration.

## How data flows (runtime)

1. User arrives and enters a display name on `JoinScreen`. `submitJoin()` (in `App.tsx`) saves it to local state. Replace this with a sign-in or session creation API as needed.
2. `App` holds `conversations` in state (initialized with `mockConversations`). It computes `visibleChats` using `filter` and `search` state.
3. Clicking a chat item in `ChatSidebar` calls `openChat(chatId)` in `App`, which sets `activeConversationId` and clears unread count for that chat.
4. The `ChatPane` component receives `activeConversation` (derived from `App`) and renders its `messages`. Each message is rendered by `MessageBubble`.
5. Sending a message: `ChatPane` submits the input form which calls `handleSubmitMessage()` in `App`. Currently this app pushes the new message into the `conversations` array. Replace this with:

	 - an API POST to create a message and/or
	 - an emit over WebSocket/Sockets to the server.

6. Typing & simulated replies: The UI currently fakes `isTyping` and schedules a mock reply (so the typing indicator and auto-reply demo work). Replace this behavior with actual `typing` socket events.

## Where to plug real APIs / sockets

- `submitJoin()` in `src/App.tsx` — call your user/session API and persist a session token.
- `handleSend()` in `src/App.tsx` — send message to backend. Option A: POST message and optimistic-update UI. Option B: emit socket message and wait for server ack.
- `createNewConversation()` in `src/App.tsx` — call an endpoint to create a conversation (returns id + initial state) before adding to UI state.
- `openChat()` — when opening a chat, consider calling an API to mark messages as read (or emit a socket event) and then set `unread` to zero locally.
- `src/utils/ws.ts` — (if present) is a good place to initialize and export your WebSocket/socket.io client, attach handlers (`message`, `typing`, `online`, `presence`), and provide a small wrapper used by `App.tsx`.

## Key functions explained (high level)

- `formatTime(date)` — friendly time formatter used to display timestamps.
- `initialsFromName(name)` — compute initials for avatar fallback.
- `colorFromName(name)` / `avatarGradient(name)` — deterministic color generation so each name has a consistent color.
- `generateId()` — UUID generator for mock message/conversation ids. Replace with server-generated ids when persisting.

## Component contracts (props)

- `ChatSidebar` props: `displayName`, `visibleChats`, `activeConversationId`, `filter`, `setFilter`, `search`, `setSearch`, `showNewPanel`, `setShowNewPanel`, `newChatType`, `setNewChatType`, `newChatName`, `setNewChatName`, `newChatMembers`, `setNewChatMembers`, `createNewConversation`, `openChat`, `activeConversation`.

- `ChatPane` props: `activeConversation`, `messageText`, `setMessageText`, `handleSubmitMessage`, `isTyping`, `setSidebarOpen`.

- `MessageBubble` props: `message`, `isMine`, `showSender`.

Keeping these contracts stable will make it easy to swap implementations or add context/state providers later.

## Responsive behavior

- The layout shows both sidebar and chat panes on wide screens; on narrow screens it toggles between them using `sidebarOpen` and a back button in `ChatPane`.

## Testing and next steps

1. Wire a WebSocket client in `src/utils/ws.ts` and import it into `App.tsx`.
2. Replace mock `setConversations(...)` calls with API/socket-backed logic leaving the optimistic UI updates if desired.
3. Add unit tests around helper functions in `src/utils/chat.ts` (e.g. color hashing, initials, time formatting).

## Important files

- [src/App.tsx](src/App.tsx)
- [src/utils/chat.ts](src/utils/chat.ts)
- [src/components/ChatSidebar.tsx](src/components/ChatSidebar.tsx)
- [src/components/ChatPane.tsx](src/components/ChatPane.tsx)
- [src/components/MessageBubble.tsx](src/components/MessageBubble.tsx)
- [src/components/JoinScreen.tsx](src/components/JoinScreen.tsx)

---

If you want, I can now:

- Wire a minimal `src/utils/ws.ts` socket client and show where to hook events, or
- Replace `handleSend()` with an example using fetch + optimistic UI, or
- Add unit tests for `utils/chat.ts`.

Tell me which next step you'd like.

