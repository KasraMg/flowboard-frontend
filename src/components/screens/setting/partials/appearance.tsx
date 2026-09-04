import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { themes } from "@/src/lib/helpers";
import { cn } from "@/src/lib/utils";
import { useTheme } from "next-themes";

const Appearance = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Theme</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTheme(opt.value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:shadow-sm",
                theme === opt.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border",
              )}
            >
              <opt.icon className="h-6 w-6" />

              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Appearance;
