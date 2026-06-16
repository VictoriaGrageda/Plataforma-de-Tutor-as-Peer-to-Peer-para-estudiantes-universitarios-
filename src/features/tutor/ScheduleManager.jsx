import { Plus, Trash2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input, Label, Select } from "../../components/ui/form";
import { PageTitle } from "../../components/layout/PageTitle";

export function ScheduleManager({ schedule, newSlot, setNewSlot, addScheduleSlot, removeScheduleSlot, toggleScheduleSlot }) {
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
