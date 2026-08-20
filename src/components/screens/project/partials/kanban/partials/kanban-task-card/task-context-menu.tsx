import {
  Copy,
  Edit2,
  Trash2,
} from "lucide-react";

import type { Column, Task } from "@/src/lib/types";

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/src/components/ui/context-menu";

type Props = {
  task: Task;
  columns: Column[];

  onDuplicate: () => void;
  onDelete: () => void;
  onMove: (columnId: string) => void;
};

export function TaskContextMenu({
  task,
  columns,
  onDuplicate,
  onDelete,
  onMove,
}: Props) {
  const otherColumns = columns.filter(
    (column) => column.id !== task.columnId,
  );

  return (
    <ContextMenuContent>
      <ContextMenuItem>
        Open
      </ContextMenuItem>

      <ContextMenuItem>
        <Edit2 className="mr-2 h-3.5 w-3.5" />
        Edit
      </ContextMenuItem>

      <ContextMenuItem onClick={onDuplicate}>
        <Copy className="mr-2 h-3.5 w-3.5" />
        Duplicate
      </ContextMenuItem>

      {otherColumns.length > 0 && (
        <>
          <ContextMenuSeparator />

          {otherColumns.map((column) => (
            <ContextMenuItem
              key={column.id}
              onClick={() => onMove(column.id)}
            >
              Move to {column.name}
            </ContextMenuItem>
          ))}
        </>
      )}

      <ContextMenuSeparator />

      <ContextMenuItem
        className="text-destructive"
        onClick={onDelete}
      >
        <Trash2 className="mr-2 h-3.5 w-3.5" />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  );
}