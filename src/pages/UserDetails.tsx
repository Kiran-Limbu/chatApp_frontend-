import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserCredentials } from "../services/auth.services.ts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UserDetails = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await setUserCredentials(id);

        if (data.userName) {
          setUsername(data.userName || "There");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message);
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
          onClick={() => navigate(`/user/chat/${id}`)}
          className="flex min-h-[54px] text-md w-full items-center justify-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-950/60 px-6 font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        >
          Enter chat
        </button>
      </section>
    </main>
  );
};

export default UserDetails;
