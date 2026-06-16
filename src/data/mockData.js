import { moreTutorsSeed } from "./moreTutorsData";

export const subjectsSeed = [
  "Programacion",
  "Base de datos",
  "Algoritmos",
  "Calculo",
  "Fisica",
  "Estadistica",
  "Redes",
  "Ingles tecnico"
];

export const tutorsSeed = [
  {
    id: 1,
    name: "Carlos Mendoza",
    career: "Ing. Sistemas",
    subjects: ["Programacion", "Base de datos", "Algoritmos"],
    mode: "Virtual",
    time: "Tarde",
    availability: "Esta semana",
    rating: 4.9,
    sessions: 32,
    bio: "Acompano a estudiantes con ejemplos practicos, ejercicios guiados y revision de codigo antes de parciales.",
    schedule: ["Lun 10:00 - 11:00", "Mar 16:00 - 17:00", "Jue 09:00 - 10:30", "Vie 15:00 - 16:00"],
    comments: ["Explica con paciencia.", "Sus ejemplos son claros.", "Me ayudo a ordenar mi proyecto."]
  },
  {
    id: 2,
    name: "Lucia Vargas",
    career: "Matematica",
    subjects: ["Calculo", "Algoritmos"],
    mode: "Presencial",
    time: "Manana",
    availability: "Hoy",
    rating: 4.7,
    sessions: 21,
    bio: "Refuerza teoria y resolucion paso a paso para estudiantes que necesitan practica acompanada.",
    schedule: ["Mar 08:00 - 09:30", "Mie 10:00 - 11:00", "Vie 09:00 - 10:00"],
    comments: ["Muy ordenada.", "Buenas practicas para examenes."]
  },
  {
    id: 3,
    name: "Diego Rojas",
    career: "Ing. Informatica",
    subjects: ["Base de datos", "Programacion"],
    mode: "Hibrida",
    time: "Noche",
    availability: "Esta semana",
    rating: 4.8,
    sessions: 27,
    bio: "Apoya proyectos con SQL, diagramas entidad relacion, normalizacion y buenas practicas.",
    schedule: [
      { label: "Lun 19:00 - 20:00", mode: "Virtual" },
      { label: "Mie 18:30 - 19:30", mode: "Virtual" },
      { label: "Sab 10:00 - 11:30", mode: "Presencial" }
    ],
    comments: ["Excelente dominio de SQL.", "Reviso mi avance con detalle."]
  },
  {
    id: 4,
    name: "Valeria Quiroga",
    career: "Ing. Industrial",
    subjects: ["Estadistica", "Calculo"],
    mode: "Virtual",
    time: "Noche",
    availability: "Manana",
    rating: 4.6,
    sessions: 18,
    bio: "Trabaja ejercicios de probabilidad, distribuciones, regresion y calculo aplicado con guias paso a paso.",
    schedule: ["Lun 20:00 - 21:00", "Mie 20:00 - 21:30", "Vie 18:00 - 19:00"],
    comments: ["Muy clara con las formulas.", "Sus resumenes ayudan bastante."]
  }
];

export const allTutorsSeed = [...tutorsSeed, ...moreTutorsSeed];
