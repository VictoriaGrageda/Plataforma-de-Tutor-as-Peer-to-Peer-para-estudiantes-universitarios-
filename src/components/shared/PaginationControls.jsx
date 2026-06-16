import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export function PaginationControls({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-muted-foreground">Pagina {page} de {totalPages}</p>
      <div className="flex gap-2">
        <Button className="min-w-0 flex-1 sm:flex-none" variant="outline" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="h-4 w-4" /> Anterior
        </Button>
        <Button className="min-w-0 flex-1 sm:flex-none" variant="outline" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
          Siguiente <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
