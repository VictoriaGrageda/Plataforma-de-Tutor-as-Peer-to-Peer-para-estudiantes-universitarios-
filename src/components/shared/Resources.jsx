import { statusVariant } from "../../lib/tutoring";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { PageTitle } from "../layout/PageTitle";
import { PaginationControls } from "./PaginationControls";
import { usePagination } from "../../hooks/usePagination";

export function Resources({ resources, tutor }) {
  const { page, pageItems, totalPages, setPage } = usePagination(resources);

  return (
    <>
      <PageTitle eyebrow="Recursos" title={tutor ? "Recursos que compartes" : "Recursos academicos compartidos"} />
      <div className="grid gap-4 md:grid-cols-3">
        {pageItems.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <Badge variant={statusVariant(resource.status)}>{resource.status}</Badge>
              <CardTitle className="break-words">{resource.title}</CardTitle>
              <CardDescription>{resource.subject} | Autor: {resource.owner}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">{resource.downloads} descargas</p>
              <Button variant="outline" className="w-full">{tutor ? "Editar recurso" : "Ver recurso"}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
