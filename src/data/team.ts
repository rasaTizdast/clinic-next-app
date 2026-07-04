import { TeamMember } from "@/lib/types";

export const team: TeamMember[] = [
  {
    id: "1",
    name: "دکتر لیلا احمدی",
    role: "متخصص پوست و زیبایی",
    bio: "فوق تخصص پوست و مو از دانشگاه تهران با بیش از ۱۰ سال تجربه در زمینه جوانسازی پوست.",
    avatar: "/team/dr-ahmadi.jpg",
  },
  {
    id: "2",
    name: "دکتر محمد حسینی",
    role: "متخصص مو",
    bio: "فوق تخصص مو و کاشت مو با بیش از ۸ سال تجربه در روش‌های نوین کاشت مو.",
    avatar: "/team/dr-hosseini.jpg",
  },
  {
    id: "3",
    name: "نیلوفر سالمی",
    role: "کارشناس زیبایی",
    bio: "کارشناس ارشد پوست و مو با تخصص در مزوتراپی و پی‌آرپی.",
    avatar: "/team/niloofar.jpg",
  },
];

export function getTeam(): TeamMember[] {
  return team;
}
