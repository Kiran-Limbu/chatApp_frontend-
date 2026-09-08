import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserCredentials } from "../services/auth.services.ts";

const WellcomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  setUserCredentials();
  
  useEffect(() => {

    const storedUser = localStorage.getItem("info");

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.userName) setUsername(user.userName || "There");
    }

  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <section className="w-full max-w-lg rounded-[32px] border border-cyan-300/15 bg-slate-900/90 p-8 text-center shadow-soft sm:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
          Mero Chat
        </p>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {username}, you are ready to chat
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-400">
          Your account is ready. Step into the conversation whenever you are.
        </p>
        <button
          type="button"
          onClick={() => navigate("/user/chat")}
          className="mt-8 min-h-[54px] w-full rounded-2xl bg-cyan-400 px-6 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Enter chat
        </button>
      </section>
    </main>
  );
};

export default WellcomePage;
