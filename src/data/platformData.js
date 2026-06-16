export const resourcesSeed = [
  { id: 1, subject: "Programacion", title: "Guia de estructuras de datos", owner: "Carlos", status: "Publicado", downloads: 48 },
  { id: 2, subject: "Base de datos", title: "Plantilla entidad relacion", owner: "Diego", status: "Publicado", downloads: 31 },
  { id: 3, subject: "Algoritmos", title: "Ejercicios de complejidad", owner: "Lucia", status: "Revision", downloads: 16 },
  { id: 4, subject: "Calculo", title: "Formulario de derivadas e integrales", owner: "Valeria", status: "Publicado", downloads: 40 },
  { id: 5, subject: "Redes", title: "Practica de subnetting con soluciones", owner: "Mateo", status: "Publicado", downloads: 27 },
  { id: 6, subject: "Fisica", title: "Problemas resueltos de cinematica", owner: "Paola", status: "Publicado", downloads: 22 },
  { id: 7, subject: "Ingles tecnico", title: "Vocabulario para presentaciones tecnicas", owner: "Andrea", status: "Revision", downloads: 12 },
  { id: 8, subject: "Estadistica", title: "Resumen de distribuciones", owner: "Valeria", status: "Publicado", downloads: 19 }
];

export const currentStudentName = "Estudiante actual";
export const currentTutorName = "Carlos Mendoza";
export const currentTutorResourceOwner = "Carlos";

export const requestSeed = [
  { id: "student-demo-1", student: currentStudentName, tutor: "Carlos Mendoza", subject: "Programacion", topic: "Arreglos y funciones", schedule: "Lun 10:00 - 11:00", mode: "Virtual", status: "Pendiente" },
  { id: "student-demo-2", student: currentStudentName, tutor: "Carlos Mendoza", subject: "Base de datos", topic: "Consultas SQL", schedule: "Jue 09:00 - 10:30", mode: "Presencial", status: "Aceptada" },
  { id: "student-demo-3", student: currentStudentName, tutor: "Lucia Vargas", subject: "Calculo", topic: "Limites laterales", schedule: "Mie 10:00 - 11:00", mode: "Presencial", status: "Finalizada" },
  { id: "student-demo-4", student: currentStudentName, tutor: "Diego Rojas", subject: "Base de datos", topic: "Normalizacion", schedule: "Sab 10:00 - 11:30", mode: "Presencial", status: "Cancelada" },
  { id: 1, student: "Mariana Choque", tutor: "Carlos Mendoza", subject: "Programacion", topic: "Estructuras de datos", schedule: "Mar 16:00 - 17:00", mode: "Virtual", status: "Pendiente" },
  { id: 2, student: "Jose Alvarez", tutor: "Carlos Mendoza", subject: "Programacion", topic: "Recursividad", schedule: "Jue 09:00 - 10:30", mode: "Virtual", status: "Pendiente" },
  { id: 3, student: "Camila Flores", tutor: "Diego Rojas", subject: "Base de datos", topic: "Normalizacion", schedule: "Sab 10:00 - 11:30", mode: "Presencial", status: "Aceptada" },
  { id: 4, student: "Luis Mercado", tutor: "Valeria Quiroga", subject: "Estadistica", topic: "Distribucion normal", schedule: "Mie 20:00 - 21:30", mode: "Virtual", status: "Aceptada" },
  { id: 5, student: "Fernanda Rios", tutor: "Mateo Salazar", subject: "Redes", topic: "Subnetting", schedule: "Jue 15:00 - 16:30", mode: "Presencial", status: "Pendiente" },
  { id: 6, student: "Nicolas Teran", tutor: "Andrea Paredes", subject: "Ingles tecnico", topic: "Presentacion oral", schedule: "Vie 11:00 - 12:00", mode: "Virtual", status: "Pendiente" }
];

export const reportSeed = [
  { id: 1, type: "Perfil", detail: "Datos incompletos de tutor", related: "Carlos Mendoza", priority: "Media", status: "Pendiente" },
  { id: 2, type: "Recurso", detail: "Material duplicado", related: "Guia de SQL", priority: "Baja", status: "Pendiente" },
  { id: 3, type: "Comportamiento", detail: "Mensaje fuera de normas", related: "Usuario invitado", priority: "Alta", status: "Pendiente" }
];
