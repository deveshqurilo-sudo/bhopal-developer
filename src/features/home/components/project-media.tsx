import { ArrowDownToLine, ArrowUpRight, FileText } from "lucide-react";
import { siteMedia } from "@/config/site";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";
import { getMediaUrl } from "../lib/media-url";
import { ProjectVideo } from "./project-video";

export function ProjectMedia() {
  const { video, brochure } = siteMedia;
  const brochureUrl = getMediaUrl(brochure.url);
  const downloadUrl = getMediaUrl(brochure.downloadUrl);
  const hasBrochure = Boolean(brochureUrl || downloadUrl);

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
          Watch the project film, browse the brochure, and take the next step at
          your own pace.
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
              Project brochure
            </span>
          </div>
          <h3 className="mt-8 text-4xl leading-tight">{brochure.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {brochure.description}
          </p>
          <div className="mt-8 border-t pt-6">
            <p className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
              <FileText className="h-4 w-4" />
              PDF document
              {brochure.sizeLabel && (
                <>
                  <span aria-hidden="true">·</span>
                  {brochure.sizeLabel}
                </>
              )}
            </p>
          </div>
          <div className="mt-auto pt-6">
            {hasBrochure ? (
              <div className="flex flex-wrap gap-3">
                {brochureUrl && (
                  <ButtonLink
                    href={brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                    aria-label="View project brochure PDF (opens in a new tab)"
                  >
                    View Brochure
                    <ArrowUpRight className="h-4 w-4" />
                  </ButtonLink>
                )}
                {downloadUrl && (
                  <ButtonLink
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="w-full flex-wrap"
                  >
                    Download PDF
                    {brochure.downloadSizeLabel && (
                      <span className="font-normal">
                        ({brochure.downloadSizeLabel})
                      </span>
                    )}
                    <ArrowDownToLine className="h-4 w-4" />
                  </ButtonLink>
                )}
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  Our brochure will be available here soon.
                </p>
                <ButtonLink
                  href="#enquiry"
                  variant="outline"
                  className="w-full"
                >
                  Enquire About the Project
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </>
            )}
          </div>
        </article>
      </div>
    </Section>
  );
}
