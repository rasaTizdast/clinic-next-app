import { TeamMember } from "@/lib/types";

export const team: TeamMember[] = [
  {
    id: "1",
    name: "دکتر بهدخت سراجی",
    role: "متخصص پوست و زیبایی",
    bio: "",
    avatar: "/team/dr-saraji.jpg",
  },
];

export function getTeam(): TeamMember[] {
  return team;
}
