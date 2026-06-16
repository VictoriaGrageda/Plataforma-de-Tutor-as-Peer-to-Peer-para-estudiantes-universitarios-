import { Card, CardContent } from "../../components/ui/card";
import { PageTitle } from "../../components/layout/PageTitle";

export function Messages() {
  return (
    <>
      <PageTitle eyebrow="Mensajes" title="Mensajes de tutoria" />
      <Card><CardContent className="p-5"><p className="text-muted-foreground">Carlos Mendoza confirmo disponibilidad para revisar estructuras de datos.</p></CardContent></Card>
    </>
  );
}
