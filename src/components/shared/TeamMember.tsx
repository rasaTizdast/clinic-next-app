"use client";

import { TeamMember as TeamMemberType } from "@/lib/types";

interface TeamMemberProps {
  member: TeamMemberType;
}

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="rounded-2xl overflow-hidden bg-surface border border-border/30 hover:border-primary/15 hover:shadow-md transition-all duration-300 group">
      {/* Avatar */}
      <div className="aspect-[3/4] bg-muted/50 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/[0.02] flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
            {member.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-base font-bold text-foreground mb-1">
          {member.name}
        </h3>
        <p className="text-sm font-semibold text-primary mb-2">
          {member.role}
        </p>
        <p className="text-sm text-foreground/40 leading-relaxed font-light">
          {member.bio}
        </p>
      </div>
    </div>
  );
}
