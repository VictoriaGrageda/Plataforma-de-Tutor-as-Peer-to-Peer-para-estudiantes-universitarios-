import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { roleConfig } from "../../config/roleConfig";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function UserMenu({ session, onLogout, onProfile }) {
  const [open, setOpen] = useState(false);
  const config = roleConfig[session.role];

  return (
    <div className="relative ml-auto">
      <Button variant="outline" size="icon" onClick={() => setOpen((value) => !value)} aria-label="Menu de usuario">
        <User className="h-5 w-5" />
      </Button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-[min(18rem,calc(100vw-2rem))] rounded-lg border bg-card p-4 shadow-panel">
          <div className="grid gap-1 border-b pb-3">
            <strong className="break-words">{session.name}</strong>
            <span className="break-all text-sm text-muted-foreground">{session.email}</span>
            <Badge className="mt-2 w-fit" variant="secondary">{config.title}</Badge>
          </div>
          <Button variant="ghost" className="mt-3 w-full justify-start" onClick={() => { onProfile(); setOpen(false); }}>
            <User className="h-4 w-4" /> Datos personales
          </Button>
          <Button variant="outline" className="w-full" onClick={onLogout}><LogOut className="h-4 w-4" /> Cerrar sesion</Button>
        </div>
      )}
    </div>
  );
}
