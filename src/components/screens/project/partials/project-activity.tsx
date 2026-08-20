type Props = {
  projectId: number;
};

export function ProjectActivity({
  projectId,
}: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Activity view
      </p>
    </div>
  );
}