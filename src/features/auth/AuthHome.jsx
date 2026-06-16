import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { demoCredentials } from "../../data/authData";
import { CredentialsList } from "./CredentialsList";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthHome({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: demoCredentials[0].email, password: demoCredentials[0].password });

  function pickCredential(credential) {
    setLoginForm({ email: credential.email, password: credential.password });
    setMode("login");
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <section className="container grid min-h-[calc(100vh-4rem)] items-center gap-8 lg:grid-cols-[1fr_420px]">
        <div className="min-w-0">
          <Badge variant="secondary" className="mb-4">Plataforma academica</Badge>
          <h1 className="max-w-3xl break-words text-4xl font-black leading-tight md:text-6xl">PeerTutor</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Encuentra tutores pares, solicita sesiones y da seguimiento a tus tutorias desde un solo lugar.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{mode === "login" ? "Iniciar sesion" : "Registrarse"}</CardTitle>
            <CardDescription>{mode === "login" ? "Entra con una cuenta demo o tus datos." : "Crea tu cuenta y luego elige si eres estudiante o tutor."}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant={mode === "login" ? "default" : "outline"} onClick={() => setMode("login")}>Iniciar sesion</Button>
              <Button variant={mode === "register" ? "default" : "outline"} onClick={() => setMode("register")}>Registrarse</Button>
            </div>
            {mode === "login" ? <LoginForm key={`${loginForm.email}-${loginForm.password}`} initialForm={loginForm} onLogin={onLogin} /> : <RegisterForm onRegister={onLogin} />}
            {mode === "login" && <CredentialsList onPick={pickCredential} />}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
