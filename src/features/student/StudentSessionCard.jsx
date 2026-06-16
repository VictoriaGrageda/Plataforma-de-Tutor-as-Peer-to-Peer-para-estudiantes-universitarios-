import { statusVariant } from "../../lib/tutoring";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";

export function StudentSessionCard({ session, onOpen }) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen();
      }}
      className="cursor-pointer transition hover:border-primary hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardContent className="grid gap-4 p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="min-w-0">
            <h3 className="break-words font-black">Tutoria con {session.tutor}</h3>
            <p className="text-sm text-muted-foreground">Materia: {session.subject} | Tema: {session.topic}</p>
            <p className="text-sm text-muted-foreground">{session.schedule} | {session.mode}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <Badge variant={statusVariant(session.status)}>{session.status}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
