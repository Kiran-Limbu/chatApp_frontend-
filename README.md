# Mero Chat — Frontend Architecture

This document describes the frontend structure, authentication flow, real-time messaging via WebSocket, and how components are connected.

## Quick Start

```bash
# Install dependencies
npm install

# Set environment variables (create .env.local)
VITE_API_URL=http://localhost:5000

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── App.tsx                    # Main router and socket orchestration
├── main.tsx                   # React root entry point
├── index.css                  # Global styles
├── pages/
│   └── LoginPage.tsx         # Google OAuth login (public)
├── components/
│   ├── ChatPane.tsx          # Main chat interface with message history & input
│   ├── GenerateToken.tsx     # Token generation for websocket auth
│   ├── MessageBubble.tsx     # Single message bubble component
│   ├── JoinScreen.tsx        # Display name entry (legacy)
│   └── protected-route/
│       └── UserProtectedRoute.tsx  # Route guard for authenticated users
├── services/
│   └── auth.services.ts      # API calls for user credentials (GET /api/user/me)
├── types/
│   └── chat.types.ts         # TypeScript definitions (Message, Conversation)
├── utils/
│   └── ws.ts                 # Socket.IO client initialization
└── api/
    └── client.ts             # Axios HTTP client wrapper
```

## Authentication Flow

1. **Public Route `/`**: User lands on `LoginPage` with Google OAuth button
2. **Google Callback**: Backend redirects to `/wellcome` after successful OAuth
3. **Token Generation `/wellcome`**: `GenerateToken` component exchanges auth code for session token
4. **Protected Chat `/user/chat`**: `UserProtectedRoute` checks `localStorage.info` before granting access
5. **Chat Interface**: Once authenticated, user connects to WebSocket and can send/receive real-time messages

```
LoginPage (Google OAuth)
    ↓
Backend Auth Flow
    ↓
GenerateToken (store token/user info)
    ↓
UserProtectedRoute (check localStorage)
    ↓
ChatPane (WebSocket connection)
```

## Data Types

Defined in [src/types/chat.types.ts](src/types/chat.types.ts):

```typescript
type Message = {
  id: number
  sender: string
  text: string
  time: string
}

type Conversation = {
  id: string
  type: 'direct' | 'group'
  name: string
  online?: boolean
  members?: string[]
  unread: number
  messages: Message[]
}
```

## Core Components

### [App.tsx](src/App.tsx)
- **Responsibilities**: Route management, WebSocket connection, message state
- **Socket Events Handled**:
  - `connect`: Initial connection established
  - `userJoinRoomNotify`: User enters room
  - `msgSendNotify`: New message received
  - `typingNotify`: User is typing
  - `stopTypingNotify`: User stopped typing
- **Socket Events Emitted**:
  - `joinRoom`: Emit when user enters chat room (with displayName)
  - `sendMsg`: Emit when user sends message
  - `typingNotify`: Emit while user is typing
  - `stopTypingNotify`: Emit when user stops typing (after 1s timeout)

### [LoginPage.tsx](src/pages/LoginPage.tsx)
- Simple public login page with Google OAuth button
- Redirects to `${VITE_API_URL}/api/auth/google`
- No state management needed

### [GenerateToken.tsx](src/components/GenerateToken.tsx)
- Generates/stores authentication token after OAuth callback
- Saves user credentials to `localStorage.info` (email, userName, avatar)
- Redirects to `/user/chat` after successful setup

### [UserProtectedRoute.tsx](src/components/protected-route/UserProtectedRoute.tsx)
- Protects `/user/*` routes by checking for `localStorage.info`
- Redirects to `/` (login) if user not authenticated
- Uses React Router's `<Outlet />` pattern

### [ChatPane.tsx](src/components/ChatPane.tsx)
- Main chat interface with:
  - Message list (rendered via `MessageBubble` components)
  - Typing indicator showing who's typing
  - Message input form
  - User avatar and room info
- Props: `messages`, `displayName`, `messageText`, `handelSendMsg`, `typingNotify`

### [MessageBubble.tsx](src/components/MessageBubble.tsx)
- Renders individual message with sender name, text, and timestamp
- Differentiates between sent (current user) and received messages
- Consistent avatar styling

## API Integration

### [services/auth.services.ts](src/services/auth.services.ts)
```typescript
// Get current user credentials after authentication
async setUserCredentials() {
  const res = await apiClientWraper.get(`${baseUrl}/api/user/me`);
  localStorage.setItem("info", JSON.stringify({
    email: res.data.user.email,
    userName: res.data.user.userName,
    avatar: res.data.user.avatar,
  }));
}
```

### [api/client.ts](src/api/client.ts)
- Axios wrapper for HTTP requests
- Handles authentication headers and error responses
- Used by auth services and future API calls

## WebSocket Integration

### [utils/ws.ts](src/utils/ws.ts)
```typescript
function connectWS() {
  const apiUrl = import.meta.env.VITE_API_URL;
  return io(apiUrl);
}
```
- Initializes Socket.IO client connected to backend
- Returns socket instance used in `App.tsx`
- Configure connection URL via `VITE_API_URL` environment variable

## Runtime Data Flow

1. User authenticates via Google → backend sets session → redirected to `/wellcome`
2. `GenerateToken` calls `setUserCredentials()` to fetch user info from `/api/user/me`
3. User info saved to `localStorage.info`; user navigated to `/user/chat`
4. `UserProtectedRoute` validates `localStorage.info` exists; grants access
5. `ChatPane` mounts; `App.tsx` establishes WebSocket connection
6. Socket handlers set up:
   - User joins room: `socket.emit("joinRoom", displayName)`
   - Incoming messages update state: `setMessages(prev => [...prev, msg])`
   - Typing notifications managed via `setTypingNotify()`
7. User types message → form submit → `handelSendMsg` → `socket.emit("sendMsg", message)`
8. Message optimistically added to local state
9. Backend broadcasts message to all room participants via `msgSendNotify`

## Environment Variables

Create `.env.local` in frontend root:

```
VITE_API_URL=http://localhost:5000
```

The `VITE_` prefix makes environment variables accessible via `import.meta.env`.

## Dependencies

- **react** — UI framework
- **react-dom** — React DOM renderer
- **react-router-dom** — Client-side routing
- **socket.io-client** — Real-time WebSocket communication
- **axios** — HTTP client
- **react-toastify** — Toast notifications
- **tailwindcss** — Utility-first CSS framework

## Key Files Reference

- [src/App.tsx](src/App.tsx) — Entry point, routing, socket management
- [src/pages/LoginPage.tsx](src/pages/LoginPage.tsx) — OAuth login
- [src/components/ChatPane.tsx](src/components/ChatPane.tsx) — Main chat UI
- [src/components/MessageBubble.tsx](src/components/MessageBubble.tsx) — Message display
- [src/services/auth.services.ts](src/services/auth.services.ts) — User API calls
- [src/utils/ws.ts](src/utils/ws.ts) — WebSocket connection
- [src/types/chat.types.ts](src/types/chat.types.ts) — Type definitions

## Next Steps

- Extend `ChatPane` with room/conversation selection UI
- Add more WebSocket events (read receipts, online status, etc.)
- Implement message persistence via API
- Add user profile and settings pages
- Implement message search and filtering

