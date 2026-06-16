import { subjectsSeed } from "./mockData";

export const subjectDetailsSeed = subjectsSeed.map((name) => ({
  id: name,
  name,
  level: "Intermedio",
  description: `Tutorias de ${name} con practica guiada y resolucion de dudas.`
}));
