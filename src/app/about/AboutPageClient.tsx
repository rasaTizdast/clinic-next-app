"use client";

import { Suspense, useRef, useState, useEffect } from "react";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((member, index) => (
        <ScrollReveal key={member.id} delay={index * 100}>
          <TeamMember member={member} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export function AboutPageClient() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 sm:py-40 bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,140,99,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              درباره <span className="text-primary">کلینیک باران</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              بیش از ۱۰ سال تجربه در ارائه بهترین خدمات زیبایی و جوانسازی
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-surface border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 100}>
                <div className="text-center p-8 rounded-3xl bg-background border border-border/40 hover:shadow-lg hover:border-primary/20 transition-all duration-500">
                  <stat.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <p className="text-4xl font-black text-foreground mb-2 tracking-tight">{stat.value}</p>
                  <p className="text-sm font-medium text-foreground/70 uppercase tracking-wide">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <StoryChapter
        eyebrow="چشم‌انداز ما"
        title="زیبایی، اعتماد به نفس، زندگی"
        description="ما باور داریم که زیبایی تنها ظاهر نیست، بلکه اعتماد به نفسی است که از درون می‌آید. تیم متخصص ما با بهترین تجهیزات و روش‌ها، به شما کمک می‌کند تا نسخه بهتر خودتان باشید."
        reverse
      >
        <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 texture-grain opacity-[0.03]" />
          <div className="w-40 h-40 rounded-full bg-primary/20 animate-pulse blur-xl" />
        </div>
      </StoryChapter>

      <section className="py-32 sm:py-40 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" style={{ letterSpacing: "-0.02em" }}>
                تیم متخصص <span className="text-primary">ما</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">
                بهترین متخصصان زیبایی در کنار شما هستند
              </p>
            </div>
          </ScrollReveal>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-[2rem]" />
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
