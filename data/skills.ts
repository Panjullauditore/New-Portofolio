export interface Skill {
  name: string;
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
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
      { name: "Vue.js" },
    ],
  },
  {
    category: "Backend",
    color: "bg-brutal-blue",
    bgColor: "#4D96FF",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Python" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "REST API" },
      { name: "GraphQL" },
    ],
  },
  {
    category: "Tools & DevOps",
    color: "bg-brutal-green",
    bgColor: "#6BCB77",
    skills: [
      { name: "Git" },
      { name: "Docker" },
      { name: "VS Code" },
      { name: "Figma" },
      { name: "Vercel" },
      { name: "Linux" },
      { name: "CI/CD" },
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
