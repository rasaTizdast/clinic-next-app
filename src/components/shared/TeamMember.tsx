"use client";

import { TeamMember as TeamMemberType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TeamMemberProps {
  member: TeamMemberType;
}

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="group relative p-8 rounded-[2rem] bg-surface border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 text-center">
      {/* Avatar */}
      <div className="relative w-28 h-28 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/20 transition-colors duration-500" />
        <div className="relative w-full h-full rounded-full bg-muted border-4 border-surface flex items-center justify-center text-3xl font-black text-primary transition-transform duration-500 group-hover:scale-105">
          {member.name.charAt(0)}
        </div>
      </div>

      {/* Info */}
      <h3 className="text-xl font-bold text-foreground mb-1.5 transition-colors duration-300 group-hover:text-primary">
        {member.name}
      </h3>
      <p className="text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
        {member.role}
      </p>
      <p className="text-[15px] text-foreground/70 leading-relaxed font-light">
        {member.bio}
      </p>
    </div>
  );
}
