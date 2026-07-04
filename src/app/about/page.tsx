import { Suspense } from "react";
import { getTeam } from "@/data";
import { Section } from "@/components/layout/Section";
import { StoryChapter } from "@/components/landing/StoryChapter";
import { TeamMember } from "@/components/shared/TeamMember";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Award, Users, Heart, Clock } from "lucide-react";

export const metadata = {
  title: "درباره ما",
  description: "درباره کلینیک زیبا و تیم متخصص ما بیشتر بدانید",
};

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

export default function AboutPage() {
  return (
    <>
      <Section>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              درباره کلینیک زیبا
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              بیش از ۱۰ سال تجربه در ارائه بهترین خدمات زیبایی و جوانسازی
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className="text-center p-6 bg-surface rounded-xl border border-border">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <StoryChapter
        eyebrow="چشم‌انداز ما"
        title="زیبایی، اعتماد به نفس، زندگی"
        description="ما باور داریم که زیبایی تنها ظاهر نیست، بلکه اعتماد به نفسی است که از درون می‌آید. تیم متخصص ما با بهترین تجهیزات و روش‌ها، به شما کمک می‌کند تا نسخه بهتر خودتان باشید."
        reverse
      >
        <div className="bg-muted rounded-2xl p-8 aspect-video flex items-center justify-center">
          <p className="text-foreground/40 text-sm">تصویر محیط کلینیک</p>
        </div>
      </StoryChapter>

      <Section background="muted">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              تیم متخصص ما
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              بهترین متخصصان زیبایی در کنار شما هستند
            </p>
          </div>
        </ScrollReveal>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          }
        >
          <TeamGrid />
        </Suspense>
      </Section>
    </>
  );
}
