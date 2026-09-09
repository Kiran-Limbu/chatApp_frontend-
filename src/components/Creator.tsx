export default function Creator() {
  const currentYear = new Date().getFullYear();
  const creatorName = "Kiran Codex";

  return (
    <footer className="w-full bg-slate-900/50 border-t border-slate-800 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <p className="text-sm text-slate-400 text-center sm:text-left">
          © {currentYear} <span className="text-cyan-300/80 font-semibold">{creatorName}</span>. All rights reserved.
        </p>
        <div className="hidden sm:block text-slate-600">•</div>
        <p className="text-sm text-slate-500 text-center">
          Made with <span className="text-red-500">❤</span> for seamless communication
        </p>
      </div>
    </footer>
  );
}
