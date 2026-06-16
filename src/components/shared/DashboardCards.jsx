import { Card, CardContent } from "../ui/card";

function Metric({ label, value }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <strong className="mt-1 block text-3xl font-black text-primary">{value}</strong>
      </CardContent>
    </Card>
  );
}

export function DashboardCards({ items }) {
  return <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map(([label, value]) => <Metric key={label} label={label} value={value} />)}</div>;
}
