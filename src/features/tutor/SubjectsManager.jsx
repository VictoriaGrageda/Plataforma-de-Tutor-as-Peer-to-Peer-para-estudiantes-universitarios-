import { subjectsSeed, allTutorsSeed } from "../../data/mockData";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { PageTitle } from "../../components/layout/PageTitle";
import { PaginationControls } from "../../components/shared/PaginationControls";
import { usePagination } from "../../hooks/usePagination";

export function SubjectsManager() {
  const { page, pageItems, totalPages, setPage } = usePagination(subjectsSeed);

  return (
    <>
      <PageTitle eyebrow="Materias" title="Materias habilitadas para tutorias" />
      <div className="grid gap-4 md:grid-cols-3">
        {pageItems.map((subject) => {
          const tutorCount = allTutorsSeed.filter((tutor) => tutor.subjects.includes(subject)).length;
          const scheduleCount = allTutorsSeed
            .filter((tutor) => tutor.subjects.includes(subject))
            .reduce((total, tutor) => total + tutor.schedule.length, 0);
          return (
            <Card key={subject}>
              <CardHeader>
                <CardTitle>{subject}</CardTitle>
                <CardDescription>{tutorCount} tutores disponibles | {scheduleCount} horarios mock</CardDescription>
              </CardHeader>
              <CardContent><Button variant="outline" className="w-full">Editar materia</Button></CardContent>
            </Card>
          );
        })}
      </div>
      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
