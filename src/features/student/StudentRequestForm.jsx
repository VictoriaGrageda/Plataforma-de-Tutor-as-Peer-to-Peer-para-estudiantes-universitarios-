import { findScheduleMode, scheduleLabel } from "../../lib/tutoring";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input, Label, Select, Textarea } from "../../components/ui/form";
import { PageTitle } from "../../components/layout/PageTitle";

export function StudentRequestForm({ selectedTutor, form, setForm, sendRequest, setView }) {
  const selectedMode = findScheduleMode(selectedTutor, form.schedule);

  return (
    <>
      <PageTitle eyebrow="Solicitud" title="Formulario de solicitud de tutoria" desc="Formulario separado como en el mock, conectado al tutor seleccionado y sus horarios activos." />
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Completa los datos de la tutoria</CardTitle>
          <CardDescription>Tutor seleccionado: {selectedTutor.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={sendRequest} className="grid gap-3">
            <Label>Materia<Select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>{selectedTutor.subjects.map((subject) => <option key={subject}>{subject}</option>)}</Select></Label>
            <Label>Tema especifico de consulta<Input required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Ej. estructuras de datos" /></Label>
            <Label>Modalidad<Input value={selectedMode} disabled className="bg-muted font-semibold text-foreground disabled:opacity-100" /></Label>
            <Label>Horario seleccionado<Select value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })}>{selectedTutor.schedule.length ? selectedTutor.schedule.map((schedule) => <option key={scheduleLabel(schedule)} value={scheduleLabel(schedule)}>{scheduleLabel(schedule)}</option>) : <option>Sin horario disponible</option>}</Select></Label>
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
