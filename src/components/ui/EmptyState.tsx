import { Inbox } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="p-6 bg-muted rounded-[2rem] mb-8">
        <Inbox className="h-10 w-10 text-foreground/60" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-base text-foreground/70 max-w-md mb-8 font-light">{description}</p>
      {action && (
        <Button variant="secondary" onClick={action.onClick} className="px-6 py-3 rounded-xl">
          {action.label}
        </Button>
      )}
    </div>
  );
}
