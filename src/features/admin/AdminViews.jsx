import { PageTitle } from "../../components/layout/PageTitle";
import { DashboardCards } from "../../components/shared/DashboardCards";
import { ListRequests } from "../../components/shared/ListRequests";
import { Reports } from "../../components/shared/Reports";
import { Card, CardContent } from "../../components/ui/card";

function UsersPanel() {
  return <><PageTitle eyebrow="Usuarios" title="Gestion de usuarios activos" /><DashboardCards items={[["Estudiantes", 84], ["Tutores", 31], ["Administradores", 5]]} /></>;
}

function ProfilesPanel() {
  return <><PageTitle eyebrow="Perfiles" title="Perfiles por revisar" /><ListRequests requests={[{ id: 1, student: "Carlos Mendoza", tutor: "Admin", subject: "Perfil tutor", topic: "Validar materias y descripcion", schedule: "Hoy", mode: "Revision", status: "Pendiente" }]} /></>;
}

function RulesPanel() {
  return (
    <>
      <PageTitle eyebrow="Normas" title="Normas de uso de la plataforma" />
      <Card><CardContent className="grid gap-3 p-5"><p>1. Mantener comunicacion respetuosa.</p><p>2. Compartir recursos academicos pertinentes.</p><p>3. Reportar perfiles o recursos inconsistentes.</p></CardContent></Card>
    </>
  );
}

export function AdminViews({ view, reports, updateReport, requests, resources }) {
  if (view === "reports") return <Reports reports={reports} updateReport={updateReport} />;
  if (view === "users") return <UsersPanel />;
  if (view === "profiles") return <ProfilesPanel />;
  if (view === "rules") return <RulesPanel />;
  return (
    <>
      <PageTitle eyebrow="Inicio admin" title="Moderacion y reportes" desc="Vista administrativa para mantener la plataforma ordenada y confiable." />
      <DashboardCards items={[["Usuarios activos", 120], ["Reportes pendientes", reports.filter((r) => r.status === "Pendiente").length], ["Solicitudes", requests.length], ["Recursos", resources.length]]} />
      <Reports reports={reports} updateReport={updateReport} compact />
    </>
  );
}
