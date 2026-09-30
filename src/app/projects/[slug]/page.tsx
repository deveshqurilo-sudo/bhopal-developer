import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  MapPin,
} from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { ButtonLink } from "@/components/ui/button-link";
import { projects } from "@/features/home/data/content";
import { getProjectDetail } from "@/features/projects/data/project-details";
import { ProjectCarousel } from "@/features/projects/components/project-carousel";
import { SiteVisitForm } from "@/features/projects/components/site-visit-form";
import { siteConfig } from "@/config/site";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getProjectDetail(slug);
  if (!detail) return { title: "Project not found" };
  const { project } = detail;
  return {
    title: `${project.name} | Project Details | ${siteConfig.name}`,
    description: `${project.type} in Bhopal. Explore ${project.name}, see project photos, download the brochure, and request a site visit.`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getProjectDetail(slug);
  if (!detail) notFound();
  const { project, gallery, galleryNote, highlights, amenities, brochure } =
    detail;

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-5 lg:px-8">
          <Brand href="/" />
          <nav
            aria-label="Project page navigation"
            className="hidden items-center gap-6 text-sm font-medium md:flex"
          >
            <Link
              href="/#projects"
              className="text-muted-foreground transition hover:text-primary"
            >
              Projects
            </Link>
            <a
              href="#overview"
              className="text-muted-foreground transition hover:text-primary"
            >
              Overview
            </a>
            <a
              href="#amenities"
              className="text-muted-foreground transition hover:text-primary"
            >
              Highlights
            </a>
            <a
              href="#site-visit"
              className="text-muted-foreground transition hover:text-primary"
            >
              Site Visit
            </a>
          </nav>
          <ButtonLink
            href="#site-visit"
            className="hidden shrink-0 !px-5 !py-2.5 sm:inline-flex"
          >
            Enquire Now
          </ButtonLink>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 py-5 text-xs text-muted-foreground sm:text-sm"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#projects" className="hover:text-primary">
            Projects
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-foreground">
            {project.name}
          </span>
        </nav>

        <ProjectCarousel
          images={gallery}
          projectName={project.name}
          note={galleryNote}
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]">
          <div>
            <p className="eyebrow">{project.type}</p>
            <h1 className="mt-2 text-5xl leading-tight md:text-6xl">
              {project.name}
            </h1>
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {project.location}
            </p>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#site-visit">
                Book a Site Visit <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={brochure.href}
                download={brochure.fileName}
                variant="outline"
              >
                <ArrowDownToLine className="h-4 w-4" />
                Download Brochure
              </ButtonLink>
            </div>
          </div>
          <aside
            className="rounded-3xl border bg-card p-6 shadow-soft"
            aria-label="Project at a glance"
          >
            <p className="eyebrow">At a glance</p>
            <h2 className="mt-2 text-3xl">Find your place here.</h2>
            <dl className="mt-5 divide-y">
              <div className="flex justify-between gap-4 py-4 text-sm">
                <dt className="text-muted-foreground">Project</dt>
                <dd className="text-right font-semibold">{project.name}</dd>
              </div>
              <div className="flex justify-between gap-4 py-4 text-sm">
                <dt className="text-muted-foreground">Type</dt>
                <dd className="text-right font-semibold">{project.type}</dd>
              </div>
              <div className="flex justify-between gap-4 py-4 text-sm">
                <dt className="text-muted-foreground">Plot sizes</dt>
                <dd className="text-right font-semibold">On request</dd>
              </div>
              <div className="flex justify-between gap-4 py-4 text-sm">
                <dt className="text-muted-foreground">Price</dt>
                <dd className="text-right font-semibold">On request</dd>
              </div>
            </dl>
            <ButtonLink href="#site-visit" className="mt-5 w-full">
              Enquire Now
            </ButtonLink>
            <a
              href={brochure.href}
              download={brochure.fileName}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:bg-accent"
            >
              <FileText className="h-4 w-4" />
              Download Brochure
            </a>
          </aside>
        </div>

        <section id="highlights" className="scroll-mt-24 pt-20">
          <p className="eyebrow">The essentials</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Project highlights</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border bg-card p-6">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {item.label}
                </p>
                <p className="mt-3 text-base font-semibold leading-snug">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="overview"
          className="scroll-mt-24 grid gap-8 border-b py-20 lg:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <p className="eyebrow">The opportunity</p>
            <h2 className="mt-3 text-4xl md:text-5xl">
              A closer look at {project.name}.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>{project.description}</p>
            <p>
              View the project gallery and brochure, then speak with our team to
              confirm current plot options, pricing and availability before
              planning your visit.
            </p>
          </div>
        </section>

        <section id="amenities" className="scroll-mt-24 pt-20">
          <p className="eyebrow">What stands out</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Project features</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-3 rounded-2xl border bg-secondary/60 p-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-primary">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold">{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="plots" className="scroll-mt-24 pt-20">
          <div className="rounded-3xl border bg-card p-6 md:p-9">
            <p className="eyebrow">Planning your purchase</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Plots & availability</h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
              Plot dimensions, facing, prices, approvals and availability can
              change. Ask our team for the current inventory and the documents
              relevant to your purchase.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#site-visit">
                Request Current Details
              </ButtonLink>
              <ButtonLink
                href={brochure.href}
                download={brochure.fileName}
                variant="outline"
              >
                <ArrowDownToLine className="h-4 w-4" />
                {brochure.title}
              </ButtonLink>
            </div>
          </div>
        </section>

        <section
          id="site-visit"
          className="scroll-mt-24 grid gap-10 pt-20 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <p className="eyebrow">Visit in person</p>
            <h2 className="mt-3 text-4xl md:text-5xl">
              Schedule a site visit.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              See the location for yourself. Share a convenient date and time,
              or reach out using the contact options on our homepage.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Contact our team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <SiteVisitForm projectName={project.name} />
        </section>

        <section className="mt-20 rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="text-4xl md:text-5xl">
            Interested in {project.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm opacity-90">
            Get the brochure and plan a visit to explore the project in person.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#site-visit"
              className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary"
            >
              Book a Site Visit
            </a>
            <a
              href={brochure.href}
              download={brochure.fileName}
              className="rounded-full border border-primary-foreground/60 px-6 py-3 text-sm font-semibold"
            >
              Download Brochure
            </a>
          </div>
        </section>
        <Link
          href="/#projects"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          View all projects
        </Link>
      </main>
      <footer className="border-t bg-ink px-5 py-10 text-ink-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Brand light href="/" />
          <p className="text-sm opacity-70">
            Explore our developments in and around Bhopal.
          </p>
        </div>
      </footer>
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 flex border-t bg-background p-3 sm:hidden">
        <a
          href="#site-visit"
          className="w-full rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
        >
          Book a Site Visit
        </a>
      </div>
    </>
  );
}
