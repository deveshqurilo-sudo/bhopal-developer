import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { Project } from "../data/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-card shadow-soft transition duration-500 hover:-translate-y-1">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View details for ${project.name}`}
        className="block h-full focus-visible:-outline-offset-4"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-7">
          <p className="eyebrow">{project.type}</p>
          <h3 className="mt-2 text-3xl">{project.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            {project.location}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View Project{" "}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
