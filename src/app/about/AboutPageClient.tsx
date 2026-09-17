"use client";

import { Suspense } from "react";
import { getTeam } from "@/data";
import { StoryChapter } from "@/components/landing/StoryChapter";
import { TeamMember } from "@/components/shared/TeamMember";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Award, Users, Heart, Clock } from "lucide-react";

const stats = [
  { icon: Clock, value: "۱۰+", label: "سال تجربه" },
  { icon: Users, value: "۵۰۰۰+", label: "مشتری راضی" },
  { icon: Award, value: "۲۰+", label: "جایزه و گواهی" },
  { icon: Heart, value: "۹۸٪", label: "رضایت مشتریان" },
];

function TeamGrid() {
  const team = getTeam();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {team.map((member, index) => (
        <ScrollReveal key={member.id} delay={index * 80}>
          <TeamMember member={member} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export function AboutPageClient() {
  return (
    <>
      {/* Hero — split diptych style */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-background overflow-hidden border-b border-border/20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <ScrollReveal>
              <div>
                <div className="eyebrow mb-4 flex items-center gap-2">
                  <span className="inline-block w-8 h-px bg-primary" />
                  درباره ما
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight text-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  درباره <span className="text-primary">کلینیک باران</span>
                </h1>
                <p className="text-lg text-foreground/40 max-w-lg font-light leading-relaxed">
                  بیش از ۱۰ سال تجربه در ارائه بهترین خدمات زیبایی
                </p>
              </div>
            </ScrollReveal>

            {/* Image column */}
            <ScrollReveal delay={100}>
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                <div className="w-36 h-36 rounded-full bg-primary/15 animate-pulse blur-xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats — horizontal strip */}
      <section className="py-16 bg-surface border-b border-border/20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 60}>
                <div className="text-center p-6 rounded-2xl bg-background border border-border/20">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-black text-foreground mb-1 tracking-tight">{stat.value}</p>
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <StoryChapter
        eyebrow="چشم‌انداز ما"
        title="زیبایی، اعتماد به نفس، زندگی"
        description="ما باور داریم که زیبایی تنها ظاهر نیست، بلکه اعتماد به نفسی است که از درون می‌آید."
        reverse
      >
        <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
          <div className="w-36 h-36 rounded-full bg-primary/15 animate-pulse blur-xl" />
        </div>
      </StoryChapter>

      {/* Team */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="eyebrow mb-4">تیم ما</div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3" style={{ letterSpacing: "-0.02em" }}>
                تیم متخصص <span className="text-primary">ما</span>
              </h2>
              <p className="text-base text-foreground/40 max-w-xl mx-auto font-light">
                بهترین متخصصان زیبایی در کنار شما
              </p>
            </div>
          </ScrollReveal>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-72 rounded-2xl" />
                ))}
              </div>
            }
          >
            <TeamGrid />
          </Suspense>
        </div>
      </section>
    </>
  );
}
