import { useState } from "react";
import { allTutorsSeed } from "../../data/mockData";
import { subjectDetailsSeed } from "../../data/subjectData";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { PageTitle } from "../../components/layout/PageTitle";
import { PaginationControls } from "../../components/shared/PaginationControls";
import { usePagination } from "../../hooks/usePagination";
import { SubjectModal } from "./SubjectModal";

export function SubjectsManager() {
  const [subjects, setSubjects] = useState(subjectDetailsSeed);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { page, pageItems, totalPages, setPage } = usePagination(subjects);

  function saveSubject(updatedSubject) {
    setSubjects((current) => current.some((subject) => subject.id === updatedSubject.id)
      ? current.map((subject) => (subject.id === updatedSubject.id ? updatedSubject : subject))
      : [updatedSubject, ...current]);
    setSelectedSubject(updatedSubject);
  }

  function deleteSubject(id) {
    setSubjects((current) => current.filter((subject) => subject.id !== id));
    setSelectedSubject(null);
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageTitle eyebrow="Materias" title="Materias habilitadas para tutorias" />
        <Button onClick={() => setSelectedSubject({ name: "", level: "Intermedio", description: "" })}>Agregar materia</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {pageItems.map((subject) => {
          const tutorCount = allTutorsSeed.filter((tutor) => tutor.subjects.includes(subject.name)).length;
          const scheduleCount = allTutorsSeed
            .filter((tutor) => tutor.subjects.includes(subject.name))
            .reduce((total, tutor) => total + tutor.schedule.length, 0);
          return (
            <Card key={subject.id} role="button" tabIndex={0} onClick={() => setSelectedSubject(subject)} className="cursor-pointer transition hover:border-primary hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <CardHeader>
                <CardTitle className="break-words">{subject.name}</CardTitle>
                <CardDescription>{tutorCount} tutores disponibles | {scheduleCount} horarios mock</CardDescription>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">{subject.level}</p></CardContent>
            </Card>
          );
        })}
      </div>
      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
      {selectedSubject && <SubjectModal subject={selectedSubject} onClose={() => setSelectedSubject(null)} onDelete={deleteSubject} onSave={saveSubject} />}
    </>
  );
}
