
import { useEffect, useRef, type MouseEvent } from 'react'
import connectWS from '../utils/ws';


const LoginPage = () => {

  const socket = useRef(null as any);

  
  useEffect(() =>{
    socket.current = connectWS();
  })
  
  // useEffect(() =>{
  //   navigate("/user/chat");
  // })

  /*
  
    const handelSubmitJoinScreen = (e: any) => {
    e.preventDefault();
    // const trimed = nameInput.trim();

    // if (!trimed) {
    //   toast.warning("Plese enter your name");
    //   return;
    // }

    //this .emit method is used to send msg in server when join room btn clicked
    // socket.current.emit("joinRoom", trimed);

    // setDisplayName(trimed);
    // setPopupJoinScreen(false);



  };

   */


  const handleGoogleAuth = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
      
  window.location.href =
    `${import.meta.env.VITE_API_URL}/api/auth/google`;

  };

  

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-950 px-4 py-10 text-slate-100 sm:px-6">
      <section className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-900/95 p-7 shadow-soft sm:p-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Mero Chat</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Welcome Mr/Miss.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sign in to continue the conversation. 🤞
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            handleGoogleAuth(e)
          }}
          className="flex min-h-[54px] w-full items-center justify-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-950/60 px-6 text-md font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          >
          <span className="text-lg font-semibold text-white" aria-hidden="true">G</span>
          Sign in with Google
        </button>
        <div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
