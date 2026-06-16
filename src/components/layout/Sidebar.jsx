import { XCircle } from "lucide-react";
import { roleConfig } from "../../config/roleConfig";
import { Button } from "../ui/button";

export function Sidebar({ role, view, setView, open, setOpen }) {
  const config = roleConfig[role];
  const content = (
    <aside className="h-full border-r bg-card p-4">
      <div className="mb-5 flex items-center justify-between lg:hidden">
        <strong>Menu {config.title}</strong>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}><XCircle className="h-5 w-5" /></Button>
      </div>
      <div className={`mb-5 rounded-lg bg-gradient-to-br ${config.color} p-4 text-white`}>
        <p className="text-sm text-white/80">Espacio de trabajo</p>
        <h2 className="text-2xl font-black">{config.title}</h2>
      </div>
      <nav className="grid gap-2">
        {config.nav.map(([id, label, Icon]) => (
          <button key={id} onClick={() => { setView(id); setOpen(false); }} className={`flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold transition ${view === id ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </nav>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block">{content}</div>
      {open && <div className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden" onClick={() => setOpen(false)}><div className="h-full w-72" onClick={(e) => e.stopPropagation()}>{content}</div></div>}
    </>
  );
}
