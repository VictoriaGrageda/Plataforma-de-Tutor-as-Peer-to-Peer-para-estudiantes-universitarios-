import { CheckCircle2, XCircle } from "lucide-react";
import { statusVariant } from "../../lib/tutoring";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Label, Textarea } from "../../components/ui/form";

export function StudentSessionModal({ session, feedbackDraft, onClose, onCancel, onFinish, onFeedbackChange, onFeedbackSubmit }) {
  const canCancel = session.status === "Pendiente" || session.status === "Aceptada";
  const canFinish = session.status === "Aceptada";
  const canComment = session.status === "Finalizada" && !session.feedback;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 px-4 py-6" onClick={onClose}>
      <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto" onClick={(event) => event.stopPropagation()}>
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div>
            <CardTitle>Detalle de tutoria</CardTitle>
            <CardDescription>{session.subject} | {session.topic}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><XCircle className="h-5 w-5" /></Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 rounded-md border p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong>Tutoria con {session.tutor}</strong>
              <Badge variant={statusVariant(session.status)}>{session.status}</Badge>
            </div>
            <p className="text-muted-foreground">{session.schedule} | {session.mode}</p>
          </div>
          {(canCancel || canFinish) && (
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              {canFinish && <Button onClick={onFinish}><CheckCircle2 className="h-4 w-4" />Finalizar tutoria</Button>}
              {canCancel && <Button variant="outline" onClick={onCancel}>Cancelar tutoria</Button>}
            </div>
          )}
          {session.feedback && <div className="rounded-md border bg-secondary/40 p-3 text-sm"><strong>Tu comentario:</strong> {session.feedback.comment}</div>}
          {canComment && (
            <form onSubmit={onFeedbackSubmit} className="grid gap-3 rounded-md border p-4">
              <Label>Comentario<Textarea required value={feedbackDraft} onChange={(e) => onFeedbackChange(e.target.value)} placeholder="Comenta como fue la tutoria" /></Label>
              <Button type="submit">Guardar comentario</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
