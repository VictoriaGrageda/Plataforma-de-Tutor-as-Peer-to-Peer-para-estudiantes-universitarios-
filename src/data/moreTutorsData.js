export const moreTutorsSeed = [
  {
    id: 5,
    name: "Mateo Salazar",
    career: "Ing. Telecomunicaciones",
    subjects: ["Redes", "Fisica"],
    mode: "Presencial",
    time: "Tarde",
    availability: "Esta semana",
    rating: 4.8,
    sessions: 24,
    bio: "Refuerza capas OSI, subnetting, configuracion basica y problemas de fisica mecanica.",
    schedule: ["Mar 14:00 - 15:30", "Jue 15:00 - 16:30", "Sab 09:00 - 10:00"],
    comments: ["Domina subnetting.", "Explica con dibujos y casos reales."]
  },
  {
    id: 6,
    name: "Andrea Paredes",
    career: "Lic. Idiomas",
    subjects: ["Ingles tecnico"],
    mode: "Virtual",
    time: "Manana",
    availability: "Hoy",
    rating: 4.9,
    sessions: 29,
    bio: "Ayuda con lectura tecnica, vocabulario de ingenieria, presentaciones y redaccion academica.",
    schedule: ["Lun 08:00 - 09:00", "Mie 07:30 - 08:30", "Vie 11:00 - 12:00"],
    comments: ["Me ayudo con mi exposicion.", "Corrige sin hacerte perder confianza."]
  },
  {
    id: 7,
    name: "Sebastian Arias",
    career: "Ing. Sistemas",
    subjects: ["Algoritmos", "Programacion", "Redes"],
    mode: "Hibrida",
    time: "Tarde",
    availability: "Hoy",
    rating: 4.7,
    sessions: 35,
    bio: "Prepara ejercicios de parciales, pseudocodigo, complejidad, estructuras y practicas de laboratorio.",
    schedule: [
      { label: "Lun 17:00 - 18:00", mode: "Presencial" },
      { label: "Mar 18:00 - 19:00", mode: "Virtual" },
      { label: "Jue 17:30 - 18:30", mode: "Virtual" }
    ],
    comments: ["Tiene ejercicios tipo examen.", "Hace que el codigo se entienda."]
  },
  {
    id: 8,
    name: "Paola Gutierrez",
    career: "Ing. Civil",
    subjects: ["Fisica", "Calculo", "Estadistica"],
    mode: "Presencial",
    time: "Manana",
    availability: "Esta semana",
    rating: 4.5,
    sessions: 14,
    bio: "Acompana resolucion de ejercicios de movimiento, derivadas, integrales y analisis de datos basico.",
    schedule: ["Mar 09:30 - 10:30", "Jue 08:00 - 09:00", "Sab 11:00 - 12:30"],
    comments: ["Buena para despejar dudas rapidas.", "Lleva ejercicios impresos."]
  }
];
