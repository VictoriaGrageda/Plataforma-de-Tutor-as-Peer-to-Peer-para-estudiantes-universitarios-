export function PageTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-black uppercase text-primary">{eyebrow}</p>
      <h1 className="text-3xl font-black tracking-normal md:text-4xl">{title}</h1>
      {desc && <p className="mt-2 max-w-3xl text-muted-foreground">{desc}</p>}
    </div>
  );
}
