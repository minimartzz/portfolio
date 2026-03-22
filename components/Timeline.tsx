"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa6";
import type { HistoryEntry, HistoryCategory } from "@/lib/types";

// ── Category config ──────────────────────────────────────────────────────────

const CATEGORY: Record<
  HistoryCategory,
  { color: string; FallbackIcon: React.ComponentType }
> = {
  Education: { color: "#2563eb", FallbackIcon: FaGraduationCap },
  Work: { color: "#059669", FallbackIcon: FaBriefcase },
  Project: { color: "#7c3aed", FallbackIcon: FaCode },
};

// ── Legend ───────────────────────────────────────────────────────────────────

const Legend = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-10">
    {(
      Object.entries(CATEGORY) as [
        HistoryCategory,
        (typeof CATEGORY)[HistoryCategory],
      ][]
    ).map(([label, { color }]) => (
      <span key={label} className="flex items-center gap-2 text-sm font-medium">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ background: color }}
        />
        {label}
      </span>
    ))}
  </div>
);

// ── Icon element ─────────────────────────────────────────────────────────────

const EntryIcon = ({ entry }: { entry: HistoryEntry }) => {
  const { FallbackIcon } = CATEGORY[entry.type];
  if (entry.icon) {
    return (
      <img
        src={entry.icon}
        alt={entry.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    );
  }
  return <FallbackIcon />;
};

// ── Date label (rendered as JSX node so it can be two lines) ─────────────────

const DateLabel = ({
  entry,
  color,
}: {
  entry: HistoryEntry;
  color: string;
}) => (
  <span>
    <span
      style={{
        display: "block",
        fontSize: "10px",
        fontWeight: 700,
        color,
      }}
    >
      {entry.startDate}
    </span>
    <span
      style={{
        display: "block",
        fontSize: "10px",
        fontWeight: 500,
        color: "var(--muted-foreground)",
      }}
    >
      {entry.endDate ?? "In progress"}
    </span>
  </span>
);

// ── Main component ───────────────────────────────────────────────────────────

export const Timeline = ({ entries }: { entries: HistoryEntry[] }) => (
  <>
    <Legend />
    <VerticalTimeline layout="1-column-left" lineColor="var(--border)">
      {entries.map((entry, i) => {
        const { color } = CATEGORY[entry.type];
        return (
          <VerticalTimelineElement
            key={i}
            date={<DateLabel entry={entry} color={color} />}
            icon={<EntryIcon entry={entry} />}
            iconStyle={{ background: color, color: "#fff" }}
            contentStyle={{
              background: "var(--card)",
              color: "var(--card-foreground)",
              border: `1px solid ${color}50`,
              boxShadow: `0 3px 0 ${color}`,
              borderRadius: "0.75rem",
            }}
            contentArrowStyle={{ borderRight: `7px solid ${color}50` }}
          >
            {/* Title + organisation */}
            <div className="mb-2">
              <h3 className="font-bold text-base leading-snug">
                {entry.title}
                {entry.organization && (
                  <span className="text-muted-foreground">
                    {" "}
                    @ {entry.organization}
                  </span>
                )}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm! leading-relaxed font-light!">
              {entry.description}
            </p>

            {/* Projects list */}
            {entry.projects && entry.projects.length > 0 && (
              <div className="mt-2">
                <h4 className="text-md">Notable Projects:</h4>
                <ul className="list-disc pl-4 mt-3 space-y-1">
                  {entry.projects.map((project) => (
                    <li key={project.title} className="text-sm leading-relaxed">
                      <span className="font-semibold">{project.title}</span>
                      <span className="font-light">
                        : {project.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies — solid colour chips matching category */}
            {entry.technologies && entry.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {entry.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-xs rounded-md font-mono font-semibold text-white"
                    style={{ background: color }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  </>
);
