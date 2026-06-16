import { useState } from "react";
import { PageTitle } from "../../components/layout/PageTitle";
import { PaginationControls } from "../../components/shared/PaginationControls";
import { currentStudentName } from "../../data/platformData";
import { usePagination } from "../../hooks/usePagination";
import { StudentSessionCard } from "./StudentSessionCard";
import { StudentSessionModal } from "./StudentSessionModal";

export function StudentSessions({ requests, updateRequest, addRequestFeedback }) {
  const myRequests = requests.filter((request) => request.student === currentStudentName);
  const { page, pageItems, totalPages, setPage } = usePagination(myRequests);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [feedbackDrafts, setFeedbackDrafts] = useState({});
  const selectedSession = myRequests.find((request) => request.id === selectedSessionId);

  function changeFeedback(id, value) {
    setFeedbackDrafts((current) => ({ ...current, [id]: value }));
  }

  function saveFeedback(event, id) {
    event.preventDefault();
    const comment = feedbackDrafts[id];
    if (!comment?.trim()) return;
    addRequestFeedback(id, { comment });
    setFeedbackDrafts((current) => ({ ...current, [id]: "" }));
    setSelectedSessionId(null);
  }

  return (
    <>
      <PageTitle eyebrow="Mis tutorias" title="Seguimiento de solicitudes y sesiones" desc="Cada solicitud muestra su estado actual: Pendiente, Aceptada, Finalizada o Cancelada." />
      <div className="grid gap-3">
        {pageItems.map((session) => (
          <StudentSessionCard key={session.id} session={session} onOpen={() => setSelectedSessionId(session.id)} />
        ))}
        <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      {selectedSession && (
        <StudentSessionModal
          session={selectedSession}
          feedbackDraft={feedbackDrafts[selectedSession.id] || ""}
          onClose={() => setSelectedSessionId(null)}
          onCancel={() => {
            updateRequest(selectedSession.id, "Cancelada");
            setSelectedSessionId(null);
          }}
          onFinish={() => updateRequest(selectedSession.id, "Finalizada")}
          onFeedbackChange={(value) => changeFeedback(selectedSession.id, value)}
          onFeedbackSubmit={(event) => saveFeedback(event, selectedSession.id)}
        />
      )}
    </>
  );
}
