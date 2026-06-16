import { Search } from "lucide-react";
import { subjectsSeed } from "../../data/mockData";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/form";
import { PageTitle } from "../../components/layout/PageTitle";

function QuickAction({ title, desc, onClick }) {
  return (
    <button onClick={onClick} className="rounded-md border bg-background p-4 text-left transition hover:border-primary hover:bg-secondary">
      <strong className="block">{title}</strong>
      <span className="text-sm text-muted-foreground">{desc}</span>
    </button>
  );
}

export function StudentHome({ setView, filters, setFilters }) {
  const searchBySubject = (subject) => {
    setFilters({ ...filters, subject, query: "" });
    setView("search");
  };

  return (
    <>
      <PageTitle eyebrow="Inicio estudiante" title="Encuentra apoyo academico entre companeros" desc="Busca por materia, revisa tutores disponibles y solicita una tutoria en minutos." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="min-h-[320px] bg-gradient-to-br from-sky-50 via-white to-lime-50">
          <CardHeader>
            <CardTitle className="text-2xl">Busqueda rapida</CardTitle>
            <CardDescription>Similar al wireframe de inicio, pero con acciones reales.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input placeholder="Buscar materia o tema..." value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
              <Button onClick={() => setView("search")}><Search className="h-4 w-4" /> Buscar</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {subjectsSeed.slice(0, 6).map((subject) => <Button key={subject} variant="outline" onClick={() => searchBySubject(subject)}>{subject}</Button>)}
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
