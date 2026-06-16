import { CheckCircle2, XCircle } from "lucide-react";
import { statusVariant } from "../../lib/tutoring";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PaginationControls } from "./PaginationControls";
import { usePagination } from "../../hooks/usePagination";

export function ListRequests({ requests, actions }) {
  const { page, pageItems, totalPages, setPage } = usePagination(requests);

  return (
    <div className="grid gap-3">
      {pageItems.map((request) => (
        <Card key={request.id}>
          <CardContent className="grid gap-3 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="min-w-0">
              <h3 className="break-words font-black">{request.student} solicita apoyo en {request.subject}</h3>
              <p className="text-sm text-muted-foreground">Tutor: {request.tutor} | Tema: {request.topic} | {request.schedule} | {request.mode}</p>
              <Badge className="mt-2" variant={statusVariant(request.status)}>{request.status}</Badge>
            </div>
            {actions && (
              <div className="flex flex-wrap gap-2">
                <Button disabled={request.status !== "Pendiente"} onClick={() => actions(request.id, "Aceptada")}><CheckCircle2 className="h-4 w-4" />Aceptar</Button>
                <Button disabled={request.status !== "Pendiente"} variant="destructive" onClick={() => actions(request.id, "Cancelada")}><XCircle className="h-4 w-4" />Cancelar</Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
