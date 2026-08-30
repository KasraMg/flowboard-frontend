"use client";

import { useSortable } from "@dnd-kit/sortable";
import { ReactNode } from "react";

type SortableColumnProps = {
  column: {
    id: number;
  };
  children: (props: {
    dragAttributes: ReturnType<typeof useSortable>["attributes"];
    dragListeners: ReturnType<typeof useSortable>["listeners"];
  }) => ReactNode;
};

export function SortableColumn({
  column,
  children,
}: SortableColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: column.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, 0, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-72 shrink-0"
    >
      {children({
        dragAttributes: attributes,
        dragListeners: listeners,
      })}
    </div>
  );
}