import { roleConfig } from "../../config/roleConfig";
import { demoCredentials } from "../../data/authData";

export function CredentialsList({ onPick }) {
  return (
    <div className="grid gap-2 border-t pt-3 text-xs">
      <p className="font-black uppercase text-primary">Credenciales demo</p>
      {demoCredentials.map((credential) => (
        <button
          key={credential.email}
          type="button"
          onClick={() => onPick(credential)}
          className="grid min-w-0 gap-0.5 rounded-md px-2 py-1 text-left transition hover:bg-secondary"
        >
          <strong className="break-words">{roleConfig[credential.role].title}</strong>
          <span className="break-all text-muted-foreground">{credential.email} / {credential.password}</span>
        </button>
      ))}
    </div>
  );
}
