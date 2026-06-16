import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { PageTitle } from "../../components/layout/PageTitle";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { statusVariant } from "../../lib/tutoring";

const profileSeed = [
  { id: 1, name: "Carlos Mendoza", detail: "Validar materias y descripcion", status: "Pendiente" },
  { id: 2, name: "Lucia Vargas", detail: "Revision de disponibilidad", status: "Pendiente" }
];

export function ProfilesPanel() {
  const [profiles, setProfiles] = useState(profileSeed);
  const updateProfile = (id, status) => setProfiles((current) => current.map((profile) => (profile.id === id ? { ...profile, status } : profile)));

  return (
    <>
      <PageTitle eyebrow="Perfiles" title="Perfiles por revisar" />
      <div className="grid gap-3">
        {profiles.map((profile) => (
          <Card key={profile.id}>
            <CardContent className="grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="min-w-0">
                <h3 className="break-words font-black">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.detail}</p>
                <Badge className="mt-2" variant={statusVariant(profile.status)}>{profile.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button disabled={profile.status !== "Pendiente"} onClick={() => updateProfile(profile.id, "Aprobado")}><CheckCircle2 className="h-4 w-4" />Aprobar</Button>
                <Button disabled={profile.status !== "Pendiente"} variant="outline" onClick={() => updateProfile(profile.id, "Bloqueado")}><XCircle className="h-4 w-4" />Rechazar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
