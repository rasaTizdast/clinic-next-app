import { Card } from "@/components/ui/Card";
import { TeamMember as TeamMemberType } from "@/lib/types";

interface TeamMemberProps {
  member: TeamMemberType;
}

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <Card className="p-6 text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-primary">
        {member.name.charAt(0)}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
      <p className="text-sm text-primary mb-3">{member.role}</p>
      <p className="text-sm text-foreground/60 leading-relaxed">{member.bio}</p>
    </Card>
  );
}
