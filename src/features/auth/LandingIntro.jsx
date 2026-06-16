import { ArrowRight, BookOpen, CalendarDays, Users } from "lucide-react";
import { Button } from "../../components/ui/button";

export function LandingIntro({ onStart }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5fbfc] text-slate-950">
      <section className="grid min-h-screen lg:grid-cols-[1fr_0.95fr]">
        <div className="container flex flex-col justify-center gap-8 px-4 py-10 lg:py-16">
          <div className="max-w-3xl">
            <p className="mb-4 w-fit rounded-md bg-cyan-100 px-3 py-1 text-sm font-black uppercase text-cyan-900">Tutorias universitarias</p>
            <h1 className="break-words text-5xl font-black leading-tight md:text-7xl">Aprende mejor con apoyo de tus companeros</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">PeerTutor conecta estudiantes y tutores pares para organizar solicitudes, horarios y seguimiento academico de forma clara.</p>
            <Button size="lg" className="mt-8" onClick={onStart}>Unete ahora <ArrowRight className="h-5 w-5" /></Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Feature Icon={Users} title="Tutores pares" />
            <Feature Icon={CalendarDays} title="Horarios claros" />
            <Feature Icon={BookOpen} title="Seguimiento" />
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-screen">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
            alt="Estudiantes universitarios estudiando juntos"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-cyan-950/20" />
          <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-2">
            <img
              className="h-32 w-full rounded-lg object-cover shadow-2xl"
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
              alt="Sesion de tutoria en laptop"
            />
            <div className="rounded-lg border border-white/25 bg-white/15 p-4 text-white backdrop-blur">
              <strong className="block text-xl">PeerTutor</strong>
              <span className="mt-2 block text-sm text-white/85">Solicita tutorias, revisa estados y aprende con acompanamiento.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ Icon, title }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-panel">
      <Icon className="h-6 w-6 text-primary" />
      <p className="mt-3 font-black">{title}</p>
    </div>
  );
}
