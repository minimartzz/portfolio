"use client";

import { useState, useMemo } from "react";
import projectsData from "@/public/projects/projects.json";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/types";

const ALL_TAGS = [
  "Data Science",
  "Machine Learning",
  "MLOps",
  "LLM",
  "Agents",
  "Diffusion",
  "Web Development",
];

const projects = projectsData as Project[];

// Only show tags that are in projects
const projectTagSet = new Set(projects.flatMap((p) => p.tags));
const TAGS = ALL_TAGS.filter((tag) => projectTagSet.has(tag));

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const filteredProjects = useMemo(() => {
    if (selectedTags.size === 0) return projects;
    return projects.filter((p) => p.tags.some((tag) => selectedTags.has(tag)));
  }, [selectedTags]);

  return (
    <div className="max-w-6xl mx-auto p-5 sm:p-20 py-10">
      <h1 className="text-3xl font-bold mb-2">projects</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Click on the project card to navigate to the site.
      </p>

      {/* Tag filter */}
      <h2 className="mb-2 font-semibold">Filter by tags:</h2>
      {TAGS.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((tag) => {
            const active = selectedTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
                className={`px-3 py-1.5 text-sm rounded-full border font-medium transition-all cursor-pointer ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.size > 0 && (
            <button
              onClick={() => setSelectedTags(new Set())}
              className="px-3 py-1.5 text-sm rounded-full border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-muted-foreground py-20">
          No projects match the selected filters.
        </p>
      )}
    </div>
  );
};

export default Projects;
