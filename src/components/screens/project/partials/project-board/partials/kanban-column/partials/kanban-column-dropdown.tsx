import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useDeleteColumn } from "@/src/hooks/useColumn";
import { Column } from "@/src/lib/types";

const KanbanColumnDropdown = ({
  projectId,
  startEditing,
  column,
}: {
  projectId: number;
  startEditing: () => void;
  column: Column;
}) => {
  const { mutate: deleteColumnMutate } = useDeleteColumn(projectId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 z-50 relative"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={startEditing}>
          <Edit2 className="mr-2 h-3.5 w-3.5" />
          Rename
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive"
          onClick={() => deleteColumnMutate(column.id)}
        >
          <Trash2 className="mr-2 h-3.5 w-3.5" />
          Delete column
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default KanbanColumnDropdown;
