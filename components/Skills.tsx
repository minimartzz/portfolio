import type { Skill } from "@/lib/types";

const groupByCategory = (skills: Skill[]): Map<string, string[]> => {
  return skills.reduce((map, skill) => {
    const names = map.get(skill.category) ?? [];
    names.push(skill.name);
    map.set(skill.category, names);
    return map;
  }, new Map<string, string[]>());
};

export const Skills = ({ skills }: { skills: Skill[] }) => {
  const grouped = groupByCategory(skills);

  return (
    <div className="flex flex-col gap-5">
      {Array.from(grouped.entries()).map(([category, names]) => (
        <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
          {/* Category label */}
          <p className="text-sm font-semibold text-muted-foreground w-36 shrink-0 pt-0.5">
            {category}
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-2">
            {names.map((name) => (
              <span
                key={name}
                className="px-3 py-1 text-sm rounded-full border border-border text-foreground/80 font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};