import { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { roleConfig } from "./config/roleConfig";
import { Sidebar } from "./components/layout/Sidebar";
import { UserMenu } from "./components/layout/UserMenu";
import { Button } from "./components/ui/button";
import { allTutorsSeed } from "./data/mockData";
import { currentStudentName, reportSeed, requestSeed, resourcesSeed } from "./data/platformData";
import { AccountProfile } from "./features/account/AccountProfile";
import { AdminViews } from "./features/admin/AdminViews";
import { AuthHome } from "./features/auth/AuthHome";
import { StudentViews } from "./features/student/StudentViews";
import { TutorViews } from "./features/tutor/TutorViews";
import { findScheduleMode, scheduleLabel } from "./lib/tutoring";

export function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTutorId, setSelectedTutorId] = useState(1);
  const [tutorSchedule, setTutorSchedule] = useState([
    { id: 1, day: "Lun", start: "10:00", end: "11:00", mode: "Virtual", active: true },
    { id: 2, day: "Mar", start: "16:00", end: "17:00", mode: "Virtual", active: true },
    { id: 3, day: "Jue", start: "09:00", end: "10:30", mode: "Presencial", active: true },
    { id: 4, day: "Vie", start: "15:00", end: "16:00", mode: "Virtual", active: true }
  ]);
  const [newSlot, setNewSlot] = useState({ day: "Lun", start: "08:00", end: "09:00", mode: "Virtual" });
  const [requests, setRequests] = useState(requestSeed);
  const [reports, setReports] = useState(reportSeed);
  const [filters, setFilters] = useState({ query: "", subject: "", mode: "", time: "", rating: "" });
  const [studentForm, setStudentForm] = useState({ subject: "Programacion", topic: "", schedule: scheduleLabel(allTutorsSeed[0].schedule[0]), message: "" });

  const editableScheduleLabels = useMemo(
    () => tutorSchedule.filter((slot) => slot.active).map((slot) => ({ label: `${slot.day} ${slot.start} - ${slot.end}`, mode: slot.mode })),
    [tutorSchedule]
  );
  const tutors = useMemo(() => allTutorsSeed.map((tutor) => (tutor.id === 1 ? { ...tutor, schedule: editableScheduleLabels } : tutor)), [editableScheduleLabels]);
  const selectedTutor = tutors.find((tutor) => tutor.id === selectedTutorId) || tutors[0];
  const filteredTutors = useMemo(() => tutors.filter((tutor) => {
    const text = `${tutor.name} ${tutor.career} ${tutor.subjects.join(" ")} ${tutor.bio} ${tutor.comments.join(" ")}`.toLowerCase();
    return (!filters.query || text.includes(filters.query.toLowerCase())) &&
      (!filters.subject || tutor.subjects.includes(filters.subject)) &&
      (!filters.mode || tutor.mode === filters.mode) &&
      (!filters.time || tutor.time === filters.time) &&
      (!filters.rating || tutor.rating >= Number(filters.rating));
  }), [filters, tutors]);

  function startSession(nextSession) {
    setSession(nextSession);
    setView("home");
    setSidebarOpen(false);
  }

  function logout() {
    setSession(null);
    setView("home");
    setSidebarOpen(false);
  }

  function sendRequest(event) {
    event.preventDefault();
    setRequests((current) => [{ id: Date.now(), student: currentStudentName, tutor: selectedTutor.name, subject: studentForm.subject, topic: studentForm.topic, schedule: studentForm.schedule, mode: findScheduleMode(selectedTutor, studentForm.schedule), status: "Pendiente" }, ...current]);
    setStudentForm((current) => ({ ...current, topic: "", message: "" }));
    setView("sessions");
  }

  function selectTutor(tutor) {
    setSelectedTutorId(tutor.id);
    setStudentForm((current) => ({ ...current, subject: tutor.subjects[0], schedule: tutor.schedule[0] ? scheduleLabel(tutor.schedule[0]) : "Sin horario disponible" }));
    setView("profile");
  }

  function addScheduleSlot(event) {
    event.preventDefault();
    const label = `${newSlot.day} ${newSlot.start} - ${newSlot.end}`;
    setTutorSchedule((current) => [...current, { id: Date.now(), ...newSlot, active: true }]);
    setStudentForm((current) => current.schedule === "Sin horario disponible" ? { ...current, schedule: label } : current);
  }

  const updateRequest = (id, status) => setRequests((current) => current.map((request) => (request.id === id ? { ...request, status } : request)));
  const addRequestFeedback = (id, feedback) => setRequests((current) => current.map((request) => (request.id === id ? { ...request, feedback } : request)));
  const updateReport = (id, status) => setReports((current) => current.map((report) => (report.id === id ? { ...report, status } : report)));
  const removeScheduleSlot = (id) => setTutorSchedule((current) => current.filter((slot) => slot.id !== id));
  const toggleScheduleSlot = (id) => setTutorSchedule((current) => current.map((slot) => (slot.id === id ? { ...slot, active: !slot.active } : slot)));

  if (!session) return <AuthHome onLogin={startSession} />;
  const role = session.role;
  const config = roleConfig[role];
  const roleView = view === "account" ? <AccountProfile session={session} /> : {
    student: <StudentViews view={view} setView={setView} filters={filters} setFilters={setFilters} tutors={filteredTutors} selectedTutor={selectedTutor} selectTutor={selectTutor} form={studentForm} setForm={setStudentForm} sendRequest={sendRequest} requests={requests} updateRequest={updateRequest} addRequestFeedback={addRequestFeedback} resources={resourcesSeed} />,
    tutor: <TutorViews view={view} requests={requests} updateRequest={updateRequest} resources={resourcesSeed} schedule={tutorSchedule} newSlot={newSlot} setNewSlot={setNewSlot} addScheduleSlot={addScheduleSlot} removeScheduleSlot={removeScheduleSlot} toggleScheduleSlot={toggleScheduleSlot} />,
    admin: <AdminViews view={view} reports={reports} updateReport={updateReport} requests={requests} resources={resourcesSeed} />
  }[role];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
        <div className="flex min-h-16 flex-wrap items-center gap-3 px-4 py-2 lg:px-7">
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></Button>
          <button className="flex items-center gap-3 font-black" onClick={() => setView("home")}><span className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${config.color} text-white`}><config.icon className="h-5 w-5" /></span><span className="text-xl">PeerTutor</span></button>
          <UserMenu session={session} onLogout={logout} onProfile={() => setView("account")} />
        </div>
      </header>
      <div className="grid lg:grid-cols-[270px_1fr]"><Sidebar role={role} view={view} setView={setView} open={sidebarOpen} setOpen={setSidebarOpen} /><main className="min-w-0 px-4 py-5 lg:px-7 lg:py-7">{roleView}</main></div>
    </div>
  );
}
