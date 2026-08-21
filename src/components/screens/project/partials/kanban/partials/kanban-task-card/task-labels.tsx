type TaskLabel = {
  id: string;
  name: string;
  color: string;
};

export function TaskLabels({ labels }: { labels: TaskLabel[] }) {
  if (!labels.length) return null;

  return (
    <div className="mb-2 flex flex-wrap gap-1">
      {labels.map((label) => (
        <span
          key={label.id}
          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{
            backgroundColor: `${label.color}20`,
            color: label.color,
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
}