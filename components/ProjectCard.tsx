"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/types";

const TRUNCATE_LENGTH = 180;

const ImagePlaceholder = ({ title }: { title: string }) => (
  <div className="w-full h-full flex items-center justify-center bg-muted">
    <span className="text-4xl font-bold text-muted-foreground/30 select-none">
      {title.charAt(0).toUpperCase()}
    </span>
  </div>
);

export const ProjectCard = ({ project }: { project: Project }) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = project.description.length > TRUNCATE_LENGTH;
  const displayedDescription =
    expanded || !isLong
      ? project.description
      : project.description.slice(0, TRUNCATE_LENGTH).trimEnd() + "…";

  return (
    <article className="flex flex-col rounded-xl border border-border overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Hero image */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <ImagePlaceholder title={project.title} />
            )}
          </a>
        ) : project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <ImagePlaceholder title={project.title} />
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-lg leading-snug hover:underline underline-offset-2"
          >
            {project.title}
          </a>
        ) : (
          <span className="font-bold text-lg leading-snug">{project.title}</span>
        )}

        {/* Description */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {displayedDescription}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="self-start text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors cursor-pointer mt-0.5"
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Tags footer */}
      {project.tags.length > 0 && (
        <footer className="flex flex-wrap gap-1.5 px-5 py-3 border-t border-border">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs rounded-full border border-foreground/20 text-foreground/55 font-medium"
            >
              {tag}
            </span>
          ))}
        </footer>
      )}
    </article>
  );
};
