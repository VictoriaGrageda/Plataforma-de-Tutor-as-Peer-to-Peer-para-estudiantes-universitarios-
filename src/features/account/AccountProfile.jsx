import { roleConfig } from "../../config/roleConfig";
import { PageTitle } from "../../components/layout/PageTitle";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function AccountProfile({ session }) {
  const config = roleConfig[session.role];

  return (
    <>
      <PageTitle eyebrow="Cuenta" title="Datos personales" desc="Informacion registrada para tu cuenta." />
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{session.name}</CardTitle>
          <Badge className="w-fit" variant="secondary">{config.title}</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm">
          <p><strong>Nombre:</strong> <span className="break-words">{session.name}</span></p>
          <p><strong>Correo:</strong> <span className="break-all">{session.email}</span></p>
          <p><strong>Rol:</strong> {config.title}</p>
        </CardContent>
      </Card>
    </>
  );
}
