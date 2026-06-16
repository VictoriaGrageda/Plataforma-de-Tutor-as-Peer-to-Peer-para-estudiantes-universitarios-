import { initials, scheduleLabel, scheduleMode } from "../../lib/tutoring";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { PageTitle } from "../../components/layout/PageTitle";

export function StudentTutorProfile({ selectedTutor, setView }) {
  return (
    <>
      <PageTitle eyebrow="Perfil del tutor" title="Perfil del tutor" desc="Estructura basada en el mock: tarjeta del tutor, informacion, horarios y comentarios." />
      <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader className="items-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-primary text-2xl font-black text-primary-foreground">{initials(selectedTutor.name)}</div>
            <CardTitle>{selectedTutor.name}</CardTitle>
            <CardDescription>{selectedTutor.career}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {selectedTutor.subjects.map((subject) => <Badge key={subject} variant="secondary">{subject}</Badge>)}
            <Button className="mt-3" onClick={() => setView("request")}>Solicitar tutoria</Button>
          </CardContent>
        </Card>
        <div className="grid gap-5">
          <Card><CardHeader><CardTitle>Informacion del tutor</CardTitle><CardDescription>{selectedTutor.bio}</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-2"><Badge variant="outline">{selectedTutor.sessions} tutorias</Badge><Badge variant="outline">{selectedTutor.rating} de calificacion</Badge><Badge variant="outline">{selectedTutor.availability}</Badge></CardContent></Card>
          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Horarios disponibles</CardTitle></CardHeader>
              <CardContent className="grid gap-2">
                {selectedTutor.schedule.length ? selectedTutor.schedule.map((schedule) => (
                  <div key={scheduleLabel(schedule)} className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-3 text-sm">
                    <span className="font-semibold">{scheduleLabel(schedule)}</span>
                    <Badge variant={scheduleMode(schedule, selectedTutor.mode) === "Virtual" ? "emerald" : "secondary"}>{scheduleMode(schedule, selectedTutor.mode)}</Badge>
                  </div>
                )) : <p className="text-sm text-muted-foreground">El tutor no tiene horarios activos.</p>}
              </CardContent>
            </Card>
            <Card><CardHeader><CardTitle>Comentarios</CardTitle></CardHeader><CardContent className="grid gap-2">{selectedTutor.comments.map((comment) => <p key={comment} className="rounded-md border p-3 text-sm">{comment}</p>)}</CardContent></Card>
          </div>
        </div>
      </div>
    </>
  );
}
