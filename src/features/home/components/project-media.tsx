import { ArrowDownToLine, ArrowUpRight, FileText } from "lucide-react";
import { siteMedia } from "@/config/site";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";
import { ProjectVideo } from "./project-video";

export function ProjectMedia() {
  const { video, brochure } = siteMedia;

  return (
    <Section
      id="project-media"
      className="border-b"
      aria-labelledby="project-media-heading"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <p className="eyebrow">A closer look</p>
          <h2
            id="project-media-heading"
            className="mt-4 max-w-2xl text-4xl leading-tight md:text-6xl"
          >
            Picture life here.
            <br />
            <em className="font-light">Explore every detail.</em>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:pb-2">
          Watch the project film, browse the brochures, and take the next step
          at your own pace.
        </p>
      </div>
      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
        <ProjectVideo key={video.src} video={video} />
        <article className="flex min-w-0 flex-col rounded-3xl border bg-secondary/60 p-7 md:p-10">
          <div className="flex items-center justify-between gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/10 bg-card text-primary">
              <FileText className="h-6 w-6" />
            </span>
            <span className="rounded-full border border-primary/15 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.15em] text-primary uppercase">
              Project brochures
            </span>
          </div>
          <h3 className="mt-8 text-4xl leading-tight">{brochure.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {brochure.description}
          </p>
          <div className="mt-8 border-t pt-2">
            {brochure.documents.length > 0 ? (
              <ul aria-label="Download project brochures" className="divide-y">
                {brochure.documents.map((document) => (
                  <li
                    key={document.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-5"
                  >
                    <div className="min-w-0 flex-1 basis-36">
                      <h4 className="text-sm font-semibold">
                        {document.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        PDF <span aria-hidden="true">·</span>{" "}
                        {document.sizeLabel}
                      </p>
                    </div>
                    <ButtonLink
                      href={`/pdf/${encodeURIComponent(document.fileName)}`}
                      download={document.fileName}
                      className="shrink-0 !px-4 !py-2.5"
                      aria-label={`Download ${document.title} (PDF, ${document.sizeLabel})`}
                    >
                      <ArrowDownToLine className="h-4 w-4" />
                      Download
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="pt-4">
                <p className="mb-4 text-sm text-muted-foreground">
                  Our brochures will be available here soon.
                </p>
                <ButtonLink
                  href="#enquiry"
                  variant="outline"
                  className="w-full"
                >
                  Enquire About the Project
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            )}
          </div>
        </article>
      </div>
    </Section>
  );
}
