import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserCredentials } from "../services/auth.services.ts";

const WellcomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      await setUserCredentials();

      const storedUser = localStorage.getItem("info");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user.userName) {
          setUsername(user.userName || "There");
        }
      }
    };

    loadUser();
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
          className="flex min-h-[54px] text-md w-full items-center justify-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-950/60 px-6 font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        >
          Enter chat
        </button>
      </section>
    </main>
  );
};

export default WellcomePage;
