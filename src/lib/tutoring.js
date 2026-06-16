export function statusVariant(status) {
  if (status === "Aceptada" || status === "Finalizada" || status === "Programada" || status === "Aprobado" || status === "Publicado" || status === "Resuelto") return "emerald";
  if (status === "Cancelada" || status === "Bloqueado" || status === "Ignorado") return "rose";
  return "amber";
}

export function scheduleLabel(schedule) {
  return typeof schedule === "string" ? schedule : schedule.label;
}

export function scheduleMode(schedule, fallbackMode) {
  return typeof schedule === "string" ? fallbackMode : schedule.mode;
}

export function findScheduleMode(tutor, selectedSchedule) {
  const match = tutor.schedule.find((schedule) => scheduleLabel(schedule) === selectedSchedule);
  return match ? scheduleMode(match, tutor.mode) : tutor.mode;
}

export function initials(name) {
  return name.split(" ").map((part) => part[0]).join("");
}
