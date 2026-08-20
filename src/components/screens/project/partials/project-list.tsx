type Props = {
  projectId: number;
};

export function ProjectList({ projectId }: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-sm text-muted-foreground">List view</p>
    </div>
  );
}
