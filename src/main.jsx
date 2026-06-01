import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Clock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Plus,
  Trash2,
  Search,
  ShieldCheck,
  Star,
  UserCheck,
  Users,
  XCircle
} from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input, Label, Select, Textarea } from "./components/ui/form";
import "./styles.css";

const tutorsSeed = [
  {
    id: 1,
    name: "Carlos Mendoza",
    career: "Ing. Sistemas",
    subjects: ["Programacion", "Base de datos", "Algoritmos"],
    mode: "Virtual",
    time: "Tarde",
    availability: "Esta semana",
    rating: 4.9,
    sessions: 32,
    bio: "Acompano a estudiantes con ejemplos practicos, ejercicios guiados y revision de codigo antes de parciales.",
    schedule: ["Lun 10:00 - 11:00", "Mar 16:00 - 17:00", "Jue 09:00 - 10:30", "Vie 15:00 - 16:00"],
    comments: ["Explica con paciencia.", "Sus ejemplos son claros.", "Me ayudo a ordenar mi proyecto."]
  },
  {
    id: 2,
    name: "Lucia Vargas",
    career: "Matematica",
    subjects: ["Calculo", "Algoritmos"],
    mode: "Presencial",
    time: "Manana",
    availability: "Hoy",
    rating: 4.7,
    sessions: 21,
    bio: "Refuerza teoria y resolucion paso a paso para estudiantes que necesitan practica acompanada.",
    schedule: ["Mar 08:00 - 09:30", "Mie 10:00 - 11:00", "Vie 09:00 - 10:00"],
    comments: ["Muy ordenada.", "Buenas practicas para examenes."]
  },
  {
    id: 3,
    name: "Diego Rojas",
    career: "Ing. Informatica",
    subjects: ["Base de datos", "Programacion"],
    mode: "Hibrida",
    time: "Noche",
    availability: "Esta semana",
    rating: 4.8,
    sessions: 27,
    bio: "Apoya proyectos con SQL, diagramas entidad relacion, normalizacion y buenas practicas.",
    schedule: ["Lun 19:00 - 20:00", "Mie 18:30 - 19:30", "Sab 10:00 - 11:30"],
    comments: ["Excelente dominio de SQL.", "Reviso mi avance con detalle."]
  }
];

const resourcesSeed = [
  { id: 1, subject: "Programacion", title: "Guia de estructuras de datos", owner: "Carlos", status: "Publicado", downloads: 48 },
  { id: 2, subject: "Base de datos", title: "Plantilla entidad relacion", owner: "Diego", status: "Publicado", downloads: 31 },
  { id: 3, subject: "Algoritmos", title: "Ejercicios de complejidad", owner: "Lucia", status: "Revision", downloads: 16 }
];

const requestSeed = [
  { id: 1, student: "Mariana Choque", tutor: "Carlos Mendoza", subject: "Programacion", topic: "Estructuras de datos", schedule: "Mar 16:00 - 17:00", mode: "Virtual", status: "Pendiente" },
  { id: 2, student: "Jose Alvarez", tutor: "Carlos Mendoza", subject: "Programacion", topic: "Recursividad", schedule: "Jue 09:00 - 10:30", mode: "Virtual", status: "Pendiente" },
  { id: 3, student: "Camila Flores", tutor: "Diego Rojas", subject: "Base de datos", topic: "Normalizacion", schedule: "Sab 10:00 - 11:30", mode: "Hibrida", status: "Programada" }
];

const reportSeed = [
  { id: 1, type: "Perfil", detail: "Datos incompletos de tutor", related: "Carlos Mendoza", priority: "Media", status: "Pendiente" },
  { id: 2, type: "Recurso", detail: "Material duplicado", related: "Guia de SQL", priority: "Baja", status: "Pendiente" },
  { id: 3, type: "Comportamiento", detail: "Mensaje fuera de normas", related: "Usuario invitado", priority: "Alta", status: "Pendiente" }
];

const roleConfig = {
  student: {
    title: "Estudiante",
    icon: GraduationCap,
    color: "from-cyan-500 to-blue-600",
    nav: [
      ["home", "Inicio", LayoutDashboard],
      ["search", "Buscar tutorias", Search],
      ["sessions", "Mis tutorias", CalendarDays],
      ["resources", "Recursos", BookOpen],
      ["messages", "Mensajes", MessageSquare]
    ]
  },
  tutor: {
    title: "Tutor",
    icon: UserCheck,
    color: "from-emerald-500 to-teal-600",
    nav: [
      ["home", "Inicio", LayoutDashboard],
      ["requests", "Solicitudes", FileText],
      ["schedule", "Horarios", Clock],
      ["subjects", "Materias", BookOpen],
      ["resources", "Recursos", BookOpen]
    ]
  },
  admin: {
    title: "Administrador",
    icon: ShieldCheck,
    color: "from-fuchsia-500 to-violet-600",
    nav: [
      ["home", "Inicio", LayoutDashboard],
      ["users", "Usuarios", Users],
      ["profiles", "Perfiles", UserCheck],
      ["reports", "Reportes", BarChart3],
      ["rules", "Normas", ShieldCheck]
    ]
  }
};

function statusVariant(status) {
  if (status === "Programada" || status === "Aprobado" || status === "Publicado") return "emerald";
  if (status === "Rechazada" || status === "Bloqueado") return "rose";
  return "amber";
}

function App() {
  const [role, setRole] = useState(null);
  const [view, setView] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTutorId, setSelectedTutorId] = useState(1);
  const [tutorSchedule, setTutorSchedule] = useState([
    { id: 1, day: "Lun", start: "10:00", end: "11:00", mode: "Virtual", active: true },
    { id: 2, day: "Mar", start: "16:00", end: "17:00", mode: "Virtual", active: true },
    { id: 3, day: "Jue", start: "09:00", end: "10:30", mode: "Presencial", active: true },
    { id: 4, day: "Vie", start: "15:00", end: "16:00", mode: "Virtual", active: true }
  ]);
  const [newSlot, setNewSlot] = useState({ day: "Lun", start: "08:00", end: "09:00", mode: "Virtual" });
  const [requests, setRequests] = useState(requestSeed);
  const [reports, setReports] = useState(reportSeed);
  const [filters, setFilters] = useState({ query: "", subject: "", mode: "", time: "", rating: "" });
  const [studentForm, setStudentForm] = useState({ subject: "Programacion", topic: "", mode: "Virtual", schedule: tutorsSeed[0].schedule[0], message: "" });

  const editableScheduleLabels = useMemo(
    () => tutorSchedule.filter((slot) => slot.active).map((slot) => `${slot.day} ${slot.start} - ${slot.end}`),
    [tutorSchedule]
  );

  const tutors = useMemo(
    () => tutorsSeed.map((tutor) => (tutor.id === 1 ? { ...tutor, schedule: editableScheduleLabels } : tutor)),
    [editableScheduleLabels]
  );

  const selectedTutor = tutors.find((tutor) => tutor.id === selectedTutorId) || tutors[0];

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const text = `${tutor.name} ${tutor.subjects.join(" ")}`.toLowerCase();
      return (
        (!filters.query || text.includes(filters.query.toLowerCase())) &&
        (!filters.subject || tutor.subjects.includes(filters.subject)) &&
        (!filters.mode || tutor.mode === filters.mode) &&
        (!filters.time || tutor.time === filters.time) &&
        (!filters.rating || tutor.rating >= Number(filters.rating))
      );
    });
  }, [filters, tutors]);

  function enterRole(nextRole) {
    setRole(nextRole);
    setView("home");
    setSidebarOpen(false);
  }

  function sendRequest(event) {
    event.preventDefault();
    setRequests((current) => [
      {
        id: Date.now(),
        student: "Estudiante actual",
        tutor: selectedTutor.name,
        subject: studentForm.subject,
        topic: studentForm.topic,
        schedule: studentForm.schedule,
        mode: studentForm.mode,
        status: "Pendiente"
      },
      ...current
    ]);
    setStudentForm((current) => ({ ...current, topic: "", message: "" }));
    setView("sessions");
  }

  function selectTutor(tutor) {
    setSelectedTutorId(tutor.id);
    setStudentForm((current) => ({
      ...current,
      subject: tutor.subjects[0],
      schedule: tutor.schedule[0] || "Sin horario disponible"
    }));
    setView("profile");
  }

  function addScheduleSlot(event) {
    event.preventDefault();
    const label = `${newSlot.day} ${newSlot.start} - ${newSlot.end}`;
    setTutorSchedule((current) => [
      ...current,
      { id: Date.now(), ...newSlot, active: true }
    ]);
    setStudentForm((current) => current.schedule === "Sin horario disponible" ? { ...current, schedule: label } : current);
  }

  function removeScheduleSlot(id) {
    setTutorSchedule((current) => current.filter((slot) => slot.id !== id));
  }

  function toggleScheduleSlot(id) {
    setTutorSchedule((current) => current.map((slot) => (slot.id === id ? { ...slot, active: !slot.active } : slot)));
  }

  function updateRequest(id, status) {
    setRequests((current) => current.map((request) => (request.id === id ? { ...request, status } : request)));
  }

  function updateReport(id, status) {
    setReports((current) => current.map((report) => (report.id === id ? { ...report, status } : report)));
  }

  if (!role) return <RoleLanding onSelect={enterRole} />;

  const config = roleConfig[role];
  const roleView = {
    student: <StudentViews view={view} setView={setView} filters={filters} setFilters={setFilters} tutors={filteredTutors} selectedTutor={selectedTutor} selectTutor={selectTutor} form={studentForm} setForm={setStudentForm} sendRequest={sendRequest} requests={requests} resources={resourcesSeed} />,
    tutor: <TutorViews view={view} requests={requests} updateRequest={updateRequest} resources={resourcesSeed} schedule={tutorSchedule} newSlot={newSlot} setNewSlot={setNewSlot} addScheduleSlot={addScheduleSlot} removeScheduleSlot={removeScheduleSlot} toggleScheduleSlot={toggleScheduleSlot} />,
    admin: <AdminViews view={view} reports={reports} updateReport={updateReport} requests={requests} resources={resourcesSeed} />
  }[role];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-4 lg:px-7">
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></Button>
          <button className="flex items-center gap-3 font-black" onClick={() => setView("home")}>
            <span className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${config.color} text-white`}><config.icon className="h-5 w-5" /></span>
            <span className="text-xl">PeerTutor</span>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary">{config.title}</Badge>
            <Button variant="outline" onClick={() => setRole(null)}><ChevronLeft className="h-4 w-4" /> Cambiar rol</Button>
          </div>
        </div>
      </header>
      <div className="grid lg:grid-cols-[270px_1fr]">
        <Sidebar role={role} view={view} setView={setView} open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="min-w-0 px-4 py-5 lg:px-7 lg:py-7">{roleView}</main>
      </div>
    </div>
  );
}

function RoleLanding({ onSelect }) {
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

function Sidebar({ role, view, setView, open, setOpen }) {
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

function PageTitle({ eyebrow, title, desc }) {
  return <div className="mb-5"><p className="text-sm font-black uppercase text-primary">{eyebrow}</p><h1 className="text-3xl font-black tracking-normal md:text-4xl">{title}</h1>{desc && <p className="mt-2 max-w-3xl text-muted-foreground">{desc}</p>}</div>;
}

function StudentViews(props) {
  const { view } = props;
  if (view === "search") return <StudentSearch {...props} />;
  if (view === "profile") return <StudentTutorProfile {...props} />;
  if (view === "request") return <StudentRequestForm {...props} />;
  if (view === "sessions") return <StudentSessions requests={props.requests} />;
  if (view === "resources") return <Resources resources={props.resources} />;
  if (view === "messages") return <Messages />;
  return <StudentHome {...props} />;
}

function StudentHome({ setView, filters, setFilters }) {
  return (
    <>
      <PageTitle eyebrow="Inicio estudiante" title="Encuentra apoyo academico entre companeros" desc="Busca por materia, revisa tutores disponibles y solicita una tutoria en minutos." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="min-h-[320px] bg-gradient-to-br from-sky-50 via-white to-lime-50">
          <CardHeader><CardTitle className="text-2xl">Busqueda rapida</CardTitle><CardDescription>Similar al wireframe de inicio, pero con acciones reales.</CardDescription></CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex flex-col gap-3 sm:flex-row"><Input placeholder="Buscar materia o tema..." value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} /><Button onClick={() => setView("search")}><Search className="h-4 w-4" /> Buscar</Button></div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setView("search")}>Registrarse</Button>
              <Button variant="outline" onClick={() => setView("search")}>Iniciar sesion</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Accesos rapidos</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            <QuickAction title="Buscar tutorias" desc="Encuentra tutores por materia" onClick={() => setView("search")} />
            <QuickAction title="Mis tutorias" desc="Revisa solicitudes y sesiones" onClick={() => setView("sessions")} />
            <QuickAction title="Recursos academicos" desc="Consulta materiales compartidos" onClick={() => setView("resources")} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function QuickAction({ title, desc, onClick }) {
  return (
    <button onClick={onClick} className="rounded-md border bg-background p-4 text-left transition hover:border-primary hover:bg-secondary">
      <strong className="block">{title}</strong>
      <span className="text-sm text-muted-foreground">{desc}</span>
    </button>
  );
}

function StudentSearch({ filters, setFilters, tutors, selectedTutor, selectTutor }) {
  return (
    <>
      <PageTitle eyebrow="Busqueda de tutorias" title="Busqueda de tutorias y lista de tutores" desc="La estructura mantiene el mock: filtros al lado izquierdo, buscador superior y lista de tutores." />
      <div className="grid gap-5 xl:grid-cols-[260px_1fr]">
        <Card><CardHeader><CardTitle>Filtros</CardTitle></CardHeader><CardContent className="grid gap-3"><FilterFields filters={filters} setFilters={setFilters} /></CardContent></Card>
        <div className="grid gap-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input placeholder="Buscar materia, tema o tutor..." value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
            <Button><Search className="h-4 w-4" /> Buscar</Button>
          </div>
          <div className="grid gap-4">
            {tutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} active={selectedTutor.id === tutor.id} onClick={() => selectTutor(tutor)} />)}
          </div>
        </div>
      </div>
    </>
  );
}

function FilterFields({ filters, setFilters }) {
  return (
    <>
      <Input placeholder="Materia, tema o tutor" value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
      <Select value={filters.subject} onChange={(e) => setFilters({ ...filters, subject: e.target.value })}><option value="">Todas las materias</option><option>Programacion</option><option>Base de datos</option><option>Algoritmos</option><option>Calculo</option></Select>
      <Select value={filters.mode} onChange={(e) => setFilters({ ...filters, mode: e.target.value })}><option value="">Todas las modalidades</option><option>Virtual</option><option>Presencial</option><option>Hibrida</option></Select>
      <Select value={filters.time} onChange={(e) => setFilters({ ...filters, time: e.target.value })}><option value="">Cualquier horario</option><option>Manana</option><option>Tarde</option><option>Noche</option></Select>
      <Select value={filters.rating} onChange={(e) => setFilters({ ...filters, rating: e.target.value })}><option value="">Cualquier calificacion</option><option value="4.5">4.5 o mas</option><option value="4.8">4.8 o mas</option></Select>
    </>
  );
}

function TutorCard({ tutor, active, onClick }) {
  return (
    <Card className={active ? "ring-2 ring-primary" : ""}>
      <CardContent className="grid gap-4 p-5 sm:grid-cols-[56px_1fr_auto] sm:items-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-cyan-100 font-black text-cyan-900">{tutor.name.split(" ").map((n) => n[0]).join("")}</div>
        <div><h3 className="font-black">{tutor.name} - {tutor.subjects[0]}</h3><p className="text-sm text-muted-foreground">{tutor.mode} | Horarios disponibles: {tutor.schedule.length} | Comentarios: {tutor.comments.length}</p><div className="mt-2 flex flex-wrap gap-2"><Badge variant="emerald">{tutor.availability}</Badge><Badge variant="amber"><Star className="mr-1 h-3 w-3" />{tutor.rating}</Badge></div></div>
        <Button onClick={onClick}>Ver perfil</Button>
      </CardContent>
    </Card>
  );
}

function StudentTutorProfile({ selectedTutor, setView }) {
  return (
    <>
      <PageTitle eyebrow="Perfil del tutor" title="Perfil del tutor" desc="Estructura basada en el mock: tarjeta del tutor, informacion, horarios y comentarios." />
      <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
      <Card><CardHeader className="items-center text-center"><div className="grid h-24 w-24 place-items-center rounded-full bg-primary text-2xl font-black text-primary-foreground">{selectedTutor.name.split(" ").map((n) => n[0]).join("")}</div><CardTitle>{selectedTutor.name}</CardTitle><CardDescription>{selectedTutor.career}</CardDescription></CardHeader><CardContent className="grid gap-2">{selectedTutor.subjects.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}<Button className="mt-3" onClick={() => setView("request")}>Solicitar tutoria</Button></CardContent></Card>
      <div className="grid gap-5">
        <Card><CardHeader><CardTitle>Informacion del tutor</CardTitle><CardDescription>{selectedTutor.bio}</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-2"><Badge variant="outline">{selectedTutor.sessions} tutorias</Badge><Badge variant="outline">{selectedTutor.rating} de calificacion</Badge><Badge variant="outline">{selectedTutor.availability}</Badge></CardContent></Card>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card><CardHeader><CardTitle>Horarios disponibles</CardTitle></CardHeader><CardContent className="grid gap-2">{selectedTutor.schedule.length ? selectedTutor.schedule.map((s) => <Badge key={s} variant="outline">{s}</Badge>) : <p className="text-sm text-muted-foreground">El tutor no tiene horarios activos.</p>}</CardContent></Card>
          <Card><CardHeader><CardTitle>Comentarios</CardTitle></CardHeader><CardContent className="grid gap-2">{selectedTutor.comments.map((c) => <p key={c} className="rounded-md border p-3 text-sm">{c}</p>)}</CardContent></Card>
        </div>
      </div>
      </div>
    </>
  );
}

function StudentRequestForm({ selectedTutor, form, setForm, sendRequest, setView }) {
  return (
    <>
      <PageTitle eyebrow="Solicitud" title="Formulario de solicitud de tutoria" desc="Formulario separado como en el mock, conectado al tutor seleccionado y sus horarios activos." />
      <Card className="mx-auto max-w-3xl">
        <CardHeader><CardTitle>Completa los datos de la tutoria</CardTitle><CardDescription>Tutor seleccionado: {selectedTutor.name}</CardDescription></CardHeader>
        <CardContent>
          <form onSubmit={sendRequest} className="grid gap-3">
            <Label>Materia<Select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>{selectedTutor.subjects.map((s) => <option key={s}>{s}</option>)}</Select></Label>
            <Label>Tema especifico de consulta<Input required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Ej. estructuras de datos" /></Label>
            <Label>Modalidad<Select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}><option>Virtual</option><option>Presencial</option><option>Hibrida</option></Select></Label>
            <Label>Horario seleccionado<Select value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })}>{selectedTutor.schedule.length ? selectedTutor.schedule.map((s) => <option key={s}>{s}</option>) : <option>Sin horario disponible</option>}</Select></Label>
            <Label>Mensaje para el tutor<Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe brevemente que necesitas reforzar" /></Label>
            <div className="flex flex-col justify-end gap-3 sm:flex-row">
              <Button type="button" variant="outline" onClick={() => setView("profile")}>Cancelar</Button>
              <Button type="submit" disabled={!selectedTutor.schedule.length}>Enviar solicitud</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

function StudentSessions({ requests }) {
  return <><PageTitle eyebrow="Mis tutorias" title="Seguimiento de solicitudes y sesiones" /><ListRequests requests={requests} /></>;
}

function TutorViews({ view, requests, updateRequest, resources, schedule, newSlot, setNewSlot, addScheduleSlot, removeScheduleSlot, toggleScheduleSlot }) {
  if (view === "requests") return <><PageTitle eyebrow="Solicitudes" title="Gestion de solicitudes recibidas" /><ListRequests requests={requests} actions={updateRequest} /></>;
  if (view === "schedule") return <ScheduleManager schedule={schedule} newSlot={newSlot} setNewSlot={setNewSlot} addScheduleSlot={addScheduleSlot} removeScheduleSlot={removeScheduleSlot} toggleScheduleSlot={toggleScheduleSlot} />;
  if (view === "subjects") return <SubjectsManager />;
  if (view === "resources") return <Resources resources={resources} tutor />;
  return <><PageTitle eyebrow="Inicio tutor" title="Panel del tutor" desc="Gestiona solicitudes, horarios, materias y recursos compartidos." /><DashboardCards items={[["Pendientes", requests.filter((r) => r.status === "Pendiente").length], ["Programadas", requests.filter((r) => r.status === "Programada").length], ["Recursos", resources.length]]} /><ListRequests requests={requests} actions={updateRequest} /></>;
}

function AdminViews({ view, reports, updateReport, requests, resources }) {
  if (view === "reports") return <Reports reports={reports} updateReport={updateReport} />;
  if (view === "users") return <UsersPanel />;
  if (view === "profiles") return <ProfilesPanel />;
  if (view === "rules") return <RulesPanel />;
  return <><PageTitle eyebrow="Inicio admin" title="Moderacion y reportes" desc="Vista administrativa para mantener la plataforma ordenada y confiable." /><DashboardCards items={[["Usuarios activos", 120], ["Reportes pendientes", reports.filter((r) => r.status === "Pendiente").length], ["Solicitudes", requests.length], ["Recursos", resources.length]]} /><Reports reports={reports} updateReport={updateReport} compact /></>;
}

function DashboardCards({ items }) {
  return <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map(([label, value]) => <Metric key={label} label={label} value={value} />)}</div>;
}

function Metric({ label, value }) {
  return <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">{label}</p><strong className="mt-1 block text-3xl font-black text-primary">{value}</strong></CardContent></Card>;
}

function ListRequests({ requests, actions }) {
  return <div className="grid gap-3">{requests.map((request) => <Card key={request.id}><CardContent className="grid gap-3 p-5 lg:grid-cols-[1fr_auto] lg:items-center"><div><h3 className="font-black">{request.student} solicita apoyo en {request.subject}</h3><p className="text-sm text-muted-foreground">Tutor: {request.tutor} | Tema: {request.topic} | {request.schedule} | {request.mode}</p><Badge className="mt-2" variant={statusVariant(request.status)}>{request.status}</Badge></div>{actions && <div className="flex flex-wrap gap-2"><Button disabled={request.status !== "Pendiente"} onClick={() => actions(request.id, "Programada")}><CheckCircle2 className="h-4 w-4" />Aceptar</Button><Button disabled={request.status !== "Pendiente"} variant="destructive" onClick={() => actions(request.id, "Rechazada")}><XCircle className="h-4 w-4" />Rechazar</Button></div>}</CardContent></Card>)}</div>;
}

function Resources({ resources, tutor }) {
  return <><PageTitle eyebrow="Recursos" title={tutor ? "Recursos que compartes" : "Recursos academicos compartidos"} /><div className="grid gap-4 md:grid-cols-3">{resources.map((r) => <Card key={r.id}><CardHeader><Badge variant={statusVariant(r.status)}>{r.status}</Badge><CardTitle>{r.title}</CardTitle><CardDescription>{r.subject} | Autor: {r.owner}</CardDescription></CardHeader><CardContent><p className="mb-4 text-sm text-muted-foreground">{r.downloads} descargas</p><Button variant="outline" className="w-full">{tutor ? "Editar recurso" : "Ver recurso"}</Button></CardContent></Card>)}</div></>;
}

function Reports({ reports, updateReport, compact }) {
  return <><PageTitle eyebrow="Reportes" title={compact ? "Reportes recientes" : "Moderacion de reportes"} /><div className="grid gap-3">{reports.map((report) => <Card key={report.id}><CardContent className="grid gap-3 p-5 lg:grid-cols-[1fr_auto] lg:items-center"><div><h3 className="font-black">Reporte por {report.type}: {report.detail}</h3><p className="text-sm text-muted-foreground">Relacionado: {report.related} | Prioridad: {report.priority}</p><Badge className="mt-2" variant={statusVariant(report.status)}>{report.status}</Badge></div><div className="flex gap-2"><Button disabled={report.status !== "Pendiente"} onClick={() => updateReport(report.id, "Aprobado")}>Resolver</Button><Button disabled={report.status !== "Pendiente"} variant="outline" onClick={() => updateReport(report.id, "Bloqueado")}>Bloquear</Button></div></CardContent></Card>)}</div></>;
}

function ScheduleManager({ schedule, newSlot, setNewSlot, addScheduleSlot, removeScheduleSlot, toggleScheduleSlot }) {
  return (
    <>
      <PageTitle eyebrow="Horarios" title="Disponibilidad del tutor" desc="Aqui el tutor puede aumentar, quitar y pausar horarios. Los horarios activos aparecen en el perfil que ve el estudiante." />
      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader><CardTitle>Agregar horario</CardTitle><CardDescription>Define dia, hora y modalidad.</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={addScheduleSlot} className="grid gap-3">
              <Label>Dia<Select value={newSlot.day} onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}><option>Lun</option><option>Mar</option><option>Mie</option><option>Jue</option><option>Vie</option><option>Sab</option></Select></Label>
              <div className="grid gap-3 sm:grid-cols-2">
                <Label>Inicio<Input type="time" value={newSlot.start} onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })} /></Label>
                <Label>Fin<Input type="time" value={newSlot.end} onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })} /></Label>
              </div>
              <Label>Modalidad<Select value={newSlot.mode} onChange={(e) => setNewSlot({ ...newSlot, mode: e.target.value })}><option>Virtual</option><option>Presencial</option><option>Hibrida</option></Select></Label>
              <Button type="submit"><Plus className="h-4 w-4" />Agregar horario</Button>
            </form>
          </CardContent>
        </Card>
        <div className="grid gap-3">
          {schedule.map((slot) => (
            <Card key={slot.id} className={!slot.active ? "opacity-70" : ""}>
              <CardContent className="grid gap-3 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h3 className="font-black">{slot.day} {slot.start} - {slot.end}</h3>
                  <p className="text-sm text-muted-foreground">Modalidad: {slot.mode}</p>
                  <Badge className="mt-2" variant={slot.active ? "emerald" : "outline"}>{slot.active ? "Activo" : "Pausado"}</Badge>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" onClick={() => toggleScheduleSlot(slot.id)}>{slot.active ? "Pausar" : "Activar"}</Button>
                  <Button variant="destructive" onClick={() => removeScheduleSlot(slot.id)}><Trash2 className="h-4 w-4" />Quitar</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {!schedule.length && <Card><CardContent className="p-5 text-sm text-muted-foreground">No hay horarios registrados. Agrega al menos uno para que los estudiantes puedan solicitar tutorias.</CardContent></Card>}
        </div>
      </div>
    </>
  );
}

function SubjectsManager() {
  return <><PageTitle eyebrow="Materias" title="Materias habilitadas para tutorias" /><div className="grid gap-4 md:grid-cols-3">{["Programacion", "Base de datos", "Algoritmos"].map((s) => <Card key={s}><CardHeader><CardTitle>{s}</CardTitle><CardDescription>Perfil visible para estudiantes</CardDescription></CardHeader><CardContent><Button variant="outline" className="w-full">Editar materia</Button></CardContent></Card>)}</div></>;
}

function UsersPanel() {
  return <><PageTitle eyebrow="Usuarios" title="Gestion de usuarios activos" /><DashboardCards items={[["Estudiantes", 84], ["Tutores", 31], ["Administradores", 5]]} /></>;
}

function ProfilesPanel() {
  return <><PageTitle eyebrow="Perfiles" title="Perfiles por revisar" /><ListRequests requests={[{ id: 1, student: "Carlos Mendoza", tutor: "Admin", subject: "Perfil tutor", topic: "Validar materias y descripcion", schedule: "Hoy", mode: "Revision", status: "Pendiente" }]} /></>;
}

function RulesPanel() {
  return <><PageTitle eyebrow="Normas" title="Normas de uso de la plataforma" /><Card><CardContent className="grid gap-3 p-5"><p>1. Mantener comunicacion respetuosa.</p><p>2. Compartir recursos academicos pertinentes.</p><p>3. Reportar perfiles o recursos inconsistentes.</p></CardContent></Card></>;
}

function Messages() {
  return <><PageTitle eyebrow="Mensajes" title="Mensajes de tutoria" /><Card><CardContent className="p-5"><p className="text-muted-foreground">Carlos Mendoza confirmo disponibilidad para revisar estructuras de datos.</p></CardContent></Card></>;
}

createRoot(document.getElementById("root")).render(<App />);
