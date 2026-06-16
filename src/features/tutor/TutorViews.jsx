import { PageTitle } from "../../components/layout/PageTitle";
import { DashboardCards } from "../../components/shared/DashboardCards";
import { ListRequests } from "../../components/shared/ListRequests";
import { Resources } from "../../components/shared/Resources";
import { currentTutorName, currentTutorResourceOwner } from "../../data/platformData";
import { ScheduleManager } from "./ScheduleManager";
import { SubjectsManager } from "./SubjectsManager";

export function TutorViews({ view, requests, updateRequest, resources, schedule, newSlot, setNewSlot, addScheduleSlot, removeScheduleSlot, toggleScheduleSlot }) {
  const tutorRequests = requests.filter((request) => request.tutor === currentTutorName);
  const tutorResources = resources.filter((resource) => resource.owner === currentTutorResourceOwner);

  if (view === "requests") return <><PageTitle eyebrow="Solicitudes" title="Gestion de solicitudes recibidas" /><ListRequests requests={tutorRequests} actions={updateRequest} /></>;
  if (view === "schedule") return <ScheduleManager schedule={schedule} newSlot={newSlot} setNewSlot={setNewSlot} addScheduleSlot={addScheduleSlot} removeScheduleSlot={removeScheduleSlot} toggleScheduleSlot={toggleScheduleSlot} />;
  if (view === "subjects") return <SubjectsManager />;
  if (view === "resources") return <Resources resources={tutorResources} tutor />;

  return (
    <>
      <PageTitle eyebrow="Inicio tutor" title="Panel del tutor" desc="Gestiona solicitudes, horarios, materias y recursos compartidos." />
      <DashboardCards items={[
        ["Pendientes", tutorRequests.filter((request) => request.status === "Pendiente").length],
        ["Aceptadas", tutorRequests.filter((request) => request.status === "Aceptada").length],
        ["Canceladas", tutorRequests.filter((request) => request.status === "Cancelada").length],
        ["Recursos", tutorResources.length]
      ]} />
      <ListRequests requests={tutorRequests} actions={updateRequest} />
    </>
  );
}
