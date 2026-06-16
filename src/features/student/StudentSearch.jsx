import { Search, Star } from "lucide-react";
import { subjectsSeed } from "../../data/mockData";
import { initials, scheduleLabel, scheduleMode } from "../../lib/tutoring";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input, Select } from "../../components/ui/form";
import { PageTitle } from "../../components/layout/PageTitle";
import { PaginationControls } from "../../components/shared/PaginationControls";
import { usePagination } from "../../hooks/usePagination";

function FilterFields({ filters, setFilters }) {
  return (
    <>
      <Input placeholder="Materia, tema o tutor" value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
      <Select value={filters.subject} onChange={(e) => setFilters({ ...filters, subject: e.target.value })}>
        <option value="">Todas las materias</option>
        {subjectsSeed.map((subject) => <option key={subject}>{subject}</option>)}
      </Select>
      <Select value={filters.mode} onChange={(e) => setFilters({ ...filters, mode: e.target.value })}><option value="">Todas las modalidades</option><option>Virtual</option><option>Presencial</option><option>Hibrida</option></Select>
      <Select value={filters.time} onChange={(e) => setFilters({ ...filters, time: e.target.value })}><option value="">Cualquier horario</option><option>Manana</option><option>Tarde</option><option>Noche</option></Select>
      <Select value={filters.rating} onChange={(e) => setFilters({ ...filters, rating: e.target.value })}><option value="">Cualquier calificacion</option><option value="4.5">4.5 o mas</option><option value="4.8">4.8 o mas</option></Select>
    </>
  );
}

function TutorCard({ tutor, active, onClick }) {
  const nextSchedule = tutor.schedule[0];
  return (
    <Card className={active ? "ring-2 ring-primary" : ""}>
      <CardContent className="grid gap-4 p-5 sm:grid-cols-[56px_1fr_auto] sm:items-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-cyan-100 font-black text-cyan-900">{initials(tutor.name)}</div>
        <div className="min-w-0">
          <h3 className="break-words font-black">{tutor.name} - {tutor.subjects[0]}</h3>
          <p className="text-sm text-muted-foreground">
            Horarios disponibles: {tutor.schedule.length} | Proximo: {nextSchedule ? `${scheduleLabel(nextSchedule)} (${scheduleMode(nextSchedule, tutor.mode)})` : "Sin horario activo"} | Comentarios: {tutor.comments.length}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tutor.subjects.map((subject) => <Badge key={subject} variant="secondary">{subject}</Badge>)}
            <Badge variant="emerald">{tutor.availability}</Badge>
            <Badge variant="amber"><Star className="mr-1 h-3 w-3" />{tutor.rating}</Badge>
          </div>
        </div>
        <Button onClick={onClick}>Ver perfil</Button>
      </CardContent>
    </Card>
  );
}

export function StudentSearch({ filters, setFilters, tutors, selectedTutor, selectTutor }) {
  const { page, pageItems, totalPages, setPage } = usePagination(tutors);

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
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <strong className="text-foreground">{tutors.length}</strong> tutores encontrados
            {filters.subject && <Badge variant="secondary">{filters.subject}</Badge>}
            {filters.mode && <Badge variant="secondary">{filters.mode}</Badge>}
            {filters.time && <Badge variant="secondary">{filters.time}</Badge>}
          </div>
          <div className="grid gap-4">
            {pageItems.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} active={selectedTutor.id === tutor.id} onClick={() => selectTutor(tutor)} />)}
            {!tutors.length && <Card><CardContent className="p-5 text-sm text-muted-foreground">No hay tutores con esos filtros. Prueba con otra materia, modalidad u horario.</CardContent></Card>}
            <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </>
  );
}
