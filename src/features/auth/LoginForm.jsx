import { LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input, Label } from "../../components/ui/form";
import { demoCredentials } from "../../data/authData";

export function LoginForm({ initialForm, onLogin }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const credential = demoCredentials.find((item) => item.email === form.email.trim().toLowerCase() && item.password === form.password);
    if (!credential) {
      setError("Credenciales incorrectas. Usa una cuenta demo o registrate.");
      return;
    }
    setError("");
    onLogin(credential);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Label>Correo<Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Label>
      <Label>Contrasena<Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Label>
      {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
      <Button type="submit" size="lg"><LogIn className="h-4 w-4" /> Iniciar sesion</Button>
    </form>
  );
}
