import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input, Label, Select } from "../../components/ui/form";

export function RegisterForm({ onRegister }) {
  const [step, setStep] = useState("data");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });

  function submitData(event) {
    event.preventDefault();
    setStep("role");
  }

  function submitRole(event) {
    event.preventDefault();
    onRegister({ name: form.name, email: form.email, password: form.password, role: form.role });
  }

  if (step === "role") {
    return (
      <form onSubmit={submitRole} className="grid gap-4">
        <Label>Tipo de cuenta<Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="student">Estudiante</option><option value="tutor">Tutor</option></Select></Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={() => setStep("data")}>Volver</Button>
          <Button type="submit"><UserPlus className="h-4 w-4" /> Crear cuenta</Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={submitData} className="grid gap-4">
      <Label>Nombre completo<Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Label>
      <Label>Correo<Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Label>
      <Label>Contrasena<Input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Label>
      <Button type="submit" size="lg">Continuar</Button>
    </form>
  );
}
