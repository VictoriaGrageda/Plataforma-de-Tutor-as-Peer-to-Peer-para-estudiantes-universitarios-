import { statusVariant } from "../../lib/tutoring";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PageTitle } from "../layout/PageTitle";

export function Reports({ reports, updateReport, compact }) {
  return (
    <>
      <PageTitle eyebrow="Reportes" title={compact ? "Reportes recientes" : "Moderacion de reportes"} />
      <div className="grid gap-3">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="grid gap-3 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3 className="font-black">Reporte por {report.type}: {report.detail}</h3>
                <p className="text-sm text-muted-foreground">Relacionado: {report.related} | Prioridad: {report.priority}</p>
                <Badge className="mt-2" variant={statusVariant(report.status)}>{report.status}</Badge>
              </div>
              <div className="flex gap-2">
                <Button disabled={report.status !== "Pendiente"} onClick={() => updateReport(report.id, "Resuelto")}>Resolver</Button>
                <Button disabled={report.status !== "Pendiente"} variant="outline" onClick={() => updateReport(report.id, "Ignorado")}>Ignorar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
