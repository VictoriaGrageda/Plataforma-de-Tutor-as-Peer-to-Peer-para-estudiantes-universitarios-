import { GraduationCap, ShieldCheck, UserCheck } from "lucide-react";

function RoleCard({ role, title, desc, Icon, onSelect }) {
  return (
    <button onClick={() => onSelect(role)} className="group rounded-lg border border-white/20 bg-white/12 p-6 text-left shadow-2xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/20">
      <span className="grid h-14 w-14 place-items-center rounded-lg bg-white text-slate-950"><Icon className="h-7 w-7" /></span>
      <h2 className="mt-6 text-2xl font-black">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/75">{desc}</p>
      <span className="mt-6 inline-flex font-bold text-cyan-100">Entrar al flujo</span>
    </button>
  );
}

export function RoleLanding({ onSelect }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#67e8f9_0,transparent_32%),radial-gradient(circle_at_top_right,#f0abfc_0,transparent_34%),linear-gradient(135deg,#0f172a,#12343b_55%,#422006)] px-4 py-10 text-white">
      <section className="container grid min-h-[calc(100vh-5rem)] content-center gap-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black leading-tight md:text-6xl">Peer-to-Peer conecta estudiantes, tutores y administradores en flujos completos.</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <RoleCard role="student" title="Estudiante" desc="Buscar tutores, solicitar tutorias, revisar agenda y recursos." Icon={GraduationCap} onSelect={onSelect} />
          <RoleCard role="tutor" title="Tutor" desc="Gestionar solicitudes, materias, horarios y recursos compartidos." Icon={UserCheck} onSelect={onSelect} />
          <RoleCard role="admin" title="Admin" desc="Moderar reportes, usuarios, perfiles y normas de uso." Icon={ShieldCheck} onSelect={onSelect} />
        </div>
      </section>
    </main>
  );
}
