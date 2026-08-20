import type { FormEvent } from 'react'

type JoinScreenProps = {
  nameInput: string
  setNameInput: (value: string) => void
  handelSubmitJoinScreen: (event: FormEvent<HTMLFormElement>) => void
}

export function JoinScreen({ nameInput, setNameInput, handelSubmitJoinScreen }: JoinScreenProps) {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 rounded-[32px] border border-white/10 bg-slate-900/95 p-10 shadow-soft">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Mero Chat</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Join the conversation.
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Pick a display name and start messaging with teammates and groups in a lively chat space.
          </p>
        </div>

        <form onSubmit={handelSubmitJoinScreen} className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="displayName">
            Display name
          </label>
          <input
            id="displayName"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            placeholder="Your display name"
            className="min-h-[54px] rounded-3xl border border-slate-700/80 bg-slate-950/80 px-5 text-base text-slate-100 outline-none transition focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20"
          />
          <button
            type="submit"
            className="min-h-[54px] rounded-3xl bg-cyan-400 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-300"
          >
            Enter Mero Chat
          </button>
        </form>

        <div className="grid gap-3 rounded-3xl bg-slate-950/80 p-6 text-sm text-slate-400 ring-1 ring-white/5">
          <p className="font-semibold text-slate-100">What to expect</p>
          <ul className="space-y-2 pl-4 text-slate-400">
            <li>• Live chat panels with direct and group flows.</li>
            <li>• Responsive sidebar, inline new-chat creator, and typing cues.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
