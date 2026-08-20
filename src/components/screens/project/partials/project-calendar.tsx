type Props = {
  projectId: number;
};

export function ProjectCalendar({
  projectId,
}: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Calendar view
      </p>
    </div>
  );
}