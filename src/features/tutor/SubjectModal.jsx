import { XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input, Label, Select, Textarea } from "../../components/ui/form";

export function SubjectModal({ subject, onClose, onDelete, onSave }) {
  const isNew = !subject.id;
  const [editing, setEditing] = useState(isNew);
  const [draft, setDraft] = useState(subject);

  function submit(event) {
    event.preventDefault();
    onSave({ ...draft, id: draft.id || draft.name });
    setEditing(false);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 px-4 py-6" onClick={onClose}>
      <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto" onClick={(event) => event.stopPropagation()}>
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="break-words">{subject.name}</CardTitle>
            <CardDescription>Detalle de materia</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><XCircle className="h-5 w-5" /></Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          {!editing ? (
            <>
              <div className="grid gap-2 text-sm">
                <p><strong>Nivel:</strong> {subject.level}</p>
                <p className="break-words"><strong>Descripcion:</strong> {subject.description}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button variant="destructive" onClick={() => onDelete(subject.id)}>Eliminar</Button>
                <Button onClick={() => setEditing(true)}>Editar</Button>
              </div>
            </>
          ) : (
            <form onSubmit={submit} className="grid gap-3">
              <Label>Nombre<Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Label>
              <Label>Nivel<Select value={draft.level} onChange={(e) => setDraft({ ...draft, level: e.target.value })}><option>Basico</option><option>Intermedio</option><option>Avanzado</option></Select></Label>
              <Label>Descripcion<Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} /></Label>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={isNew ? onClose : () => setEditing(false)}>Cancelar</Button>
                <Button type="submit">Guardar cambios</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
