import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Search,
  ShieldCheck,
  UserCheck,
  Users
} from "lucide-react";

export const roleConfig = {
  student: {
    title: "Estudiante",
    icon: GraduationCap,
    color: "from-cyan-500 to-blue-600",
    nav: [
      ["home", "Inicio", LayoutDashboard],
      ["search", "Buscar tutorias", Search],
      ["sessions", "Mis tutorias", CalendarDays],
      ["resources", "Recursos", BookOpen],
      ["messages", "Mensajes", MessageSquare]
    ]
  },
  tutor: {
    title: "Tutor",
    icon: UserCheck,
    color: "from-emerald-500 to-teal-600",
    nav: [
      ["home", "Inicio", LayoutDashboard],
      ["requests", "Solicitudes", FileText],
      ["schedule", "Horarios", Clock],
      ["subjects", "Materias", BookOpen],
      ["resources", "Recursos", BookOpen]
    ]
  },
  admin: {
    title: "Administrador",
    icon: ShieldCheck,
    color: "from-fuchsia-500 to-violet-600",
    nav: [
      ["home", "Inicio", LayoutDashboard],
      ["users", "Usuarios", Users],
      ["profiles", "Perfiles", UserCheck],
      ["reports", "Reportes", BarChart3],
      ["rules", "Normas", ShieldCheck]
    ]
  }
};
