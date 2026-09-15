export interface Skill {
  name: string;
  color?: string; // Brand color from tech stack badge
  textColor?: string; // Text color (white or dark)
  icon?: string;
}

export interface SkillCategory {
  category: string;
  color: string;
  bgColor: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    color: "bg-brutal-yellow",
    bgColor: "#FFE925",
    skills: [
      { name: "HTML", color: "#E44D26", textColor: "#FFFFFF" },
      { name: "CSS", color: "#1572B6", textColor: "#FFFFFF" },
      { name: "JavaScript", color: "#F7DF1E", textColor: "#1A1A2E" },
      { name: "TypeScript", color: "#3178C6", textColor: "#FFFFFF" },
      { name: "React", color: "#00D8FF", textColor: "#1A1A2E" },
      { name: "Next.js", color: "#000000", textColor: "#FFFFFF" },
      { name: "Tailwind", color: "#06B6D4", textColor: "#FFFFFF" },
    ],
  },
  {
    category: "Backend",
    color: "bg-brutal-blue",
    bgColor: "#4D96FF",
    skills: [
      { name: "Node.js", color: "#339933", textColor: "#FFFFFF" },
      { name: "Laravel", color: "#FF2D20", textColor: "#FFFFFF" },
      { name: "Python", color: "#3776AB", textColor: "#FFFFFF" },
      { name: "MySQL", color: "#4479A1", textColor: "#FFFFFF" },
      { name: "Prisma", color: "#2D3748", textColor: "#FFFFFF" },
    ],
  },
  {
    category: "Tools & DevOps",
    color: "bg-brutal-green",
    bgColor: "#6BCB77",
    skills: [
      { name: "Figma", color: "#F24E1E", textColor: "#FFFFFF" },
      { name: "Git", color: "#F05032", textColor: "#FFFFFF" },
      { name: "VS Code", color: "#007ACC", textColor: "#FFFFFF" },
    ],
  },
  {
    category: "Soft Skills",
    color: "bg-brutal-pink",
    bgColor: "#FF6B9D",
    skills: [
      { name: "Problem Solving" },
      { name: "Team Work" },
      { name: "Communication" },
      { name: "Leadership" },
      { name: "Agile/Scrum" },
    ],
  },
];
