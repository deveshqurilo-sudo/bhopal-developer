import Image from "next/image";
import {
  Compass,
  FileText,
  LayoutGrid,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { siteConfig, siteImages } from "@/config/site";
import { locations, projects, statistics } from "../data/content";
import { EnquiryForm } from "./enquiry-form";
import { ProjectCard } from "./project-card";
import { ContactQrCard } from "./contact-qr-card";

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow">A better way to own Plots</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-6xl">
            Spaces designed for living, investing and growing.
          </h2>
        </div>
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p>
            We develop thoughtfully planned Plots and farmhouse projects around
            Bhopal, bringing together location, accessibility, open spaces and a
            better ownership experience.
          </p>
          <p>
            Whether you are looking to build your dream farmhouse, secure a plot
            for the future or explore a real estate investment, our projects are
            designed to give you the right space and the right opportunity.
          </p>
        </div>
      </div>
    </Section>
  );
}

export function ProjectsSection() {
  return (
    <Section id="projects" className="bg-secondary/60">
      <p className="eyebrow">Our projects</p>
      <h2 className="mt-4 text-4xl md:text-6xl">Explore Our Developments</h2>
      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}

const benefits = [
  {
    icon: Compass,
    title: "Thoughtful Locations",
    description:
      "Projects selected around emerging and accessible locations in and around Bhopal.",
  },
  {
    icon: LayoutGrid,
    title: "Planned Developments",
    description:
      "Projects designed with a focus on layout, accessibility and usable spaces.",
  },
  {
    icon: FileText,
    title: "Transparent Process",
    description:
      "Clear project information and straightforward communication from enquiry to site visit.",
  },
  {
    icon: Users,
    title: "Personal Assistance",
    description:
      "Our team assists buyers throughout the project discovery and site-visit process.",
  },
];

export function BenefitsSection() {
  return (
    <Section>
      <p className="eyebrow">Why us</p>
      <h2 className="mt-4 max-w-2xl text-4xl md:text-6xl">
        More than land. A better ownership experience.
      </h2>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-3xl border bg-card p-7 transition hover:shadow-soft"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-6 text-2xl">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const mapPins = [
  { top: "48%", left: "42%" },
  { top: "22%", left: "28%" },
  { top: "70%", left: "64%" },
  { top: "30%", left: "74%" },
];

export function LocationSection() {
  return (
    <Section id="location" className="bg-secondary/60">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-3xl shadow-soft">
          <Image
            src={siteImages.locationMap}
            alt="Illustrative map of project areas around Bhopal"
            width={1200}
            height={1200}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-square w-full object-cover"
          />
          {mapPins.map((position, index) => (
            <span
              key={locations[index]}
              className="absolute flex items-center gap-2"
              style={position}
            >
              <span
                className={`block shrink-0 rounded-full ring-4 ring-card ${index === 0 ? "h-4 w-4 bg-ink" : "h-3 w-3 bg-primary"}`}
              />
              <span className="rounded-full bg-card px-3 py-1 text-xs font-medium shadow-soft">
                {locations[index]}
              </span>
            </span>
          ))}
        </div>
        <div>
          <p className="eyebrow">Location</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
            Connected to Bhopal. Closer to what matters.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Our projects are located across promising areas around Bhopal,
            selected for accessibility, surroundings and future development
            potential.
          </p>
          <ul className="mt-8 divide-y border-y">
            {locations.map((location) => (
              <li key={location} className="flex items-center gap-3 py-4">
                <MapPin className="h-4 w-4 text-primary" />
                {location}
              </li>
            ))}
          </ul>
          <ButtonLink
            href={siteConfig.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8"
          >
            Get Directions
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

export function StatisticsSection() {
  return (
    <section
      aria-label="Our developments in numbers"
      className="border-b px-5 py-16 md:px-8"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
        {statistics.map((statistic) => (
          <div
            key={statistic.label}
            className="text-center md:border-l md:first:border-l-0"
          >
            <p className="font-display text-5xl text-primary md:text-6xl">
              {statistic.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {statistic.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FarmhouseSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden px-5 py-20 md:px-8">
      <Image
        src={siteImages.farmhouse}
        alt="Modern farmhouse surrounded by greenery"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl text-ink-foreground">
        <p className="text-xs font-semibold tracking-[0.22em] opacity-90">
          YOUR OWN SPACE
        </p>
        <h2 className="mt-4 max-w-xl text-5xl leading-tight md:text-7xl">
          Wake up closer to nature.
        </h2>
        <p className="mt-5 max-w-md leading-relaxed opacity-85">
          Imagine having your own space away from the city&apos;s everyday pace
          — a place for weekends, family gatherings, celebrations and peaceful
          living.
        </p>
        <ButtonLink href="#projects"  variant="outline"
            className=" mt-8 text-ink-foreground hover:bg-ink-foreground/10">
          Explore Farmhouse Projects
        </ButtonLink>
      </div>
    </section>
  );
}

const possibilities = [
  {
    number: "01",
    title: "Build",
    description: "Create a space that reflects your lifestyle.",
  },
  { number: "02", title: "Hold", description: "Own Plot for the future." },
  {
    number: "03",
    title: "Grow",
    description: "Explore opportunities in developing locations.",
  },
];

export function PossibilitiesSection() {
  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-4xl leading-tight md:text-6xl">
            Plots that gives you possibilities.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            A well-located plot can offer more than ownership. It can become a
            future home, a farmhouse, a weekend retreat or a long-term asset.
          </p>
          <Image
            src={siteImages.possibilities}
            alt="Planned plots"
            width={1200}
            height={900}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="mt-10 aspect-[16/10] w-full rounded-3xl object-cover"
          />
        </div>
        <div className="flex flex-col justify-center divide-y">
          {possibilities.map((item) => (
            <div key={item.number} className="flex gap-6 py-8">
              <span className="text-sm font-semibold text-primary">
                {item.number}
              </span>
              <div>
                <h3 className="text-4xl">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function VisitSection() {
  return (
    <section className="bg-ink px-5 py-24 text-center text-ink-foreground md:px-8 md:py-32">
      <h2 className="mx-auto max-w-3xl text-5xl leading-tight md:text-7xl">
        See It. Walk It. Experience It.
      </h2>
      <p className="mx-auto mt-6 max-w-lg opacity-75">
        Pictures can show you the project. A site visit lets you experience the
        location for yourself.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="#enquiry">Book a Site Visit</ButtonLink>
        <ButtonLink
          href={siteConfig.phoneHref}
          variant="outline"
          className="hover:bg-ink-foreground/10"
        >
          Talk to Our Team
        </ButtonLink>
      </div>
    </section>
  );
}

export function EnquirySection() {
  return (
    <Section id="enquiry">
      <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="text-4xl leading-tight md:text-5xl">
            Let&apos;s Find the Right Project for You
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
            Share your details and our team will help you explore available
            plots and farmhouse projects.
          </p>
        </div>
        <div className="rounded-3xl bg-card p-6 shadow-soft md:p-10">
          <EnquiryForm />
        </div>
      </div>
    </Section>
  );
}

const contacts = [
  { icon: Phone, label: "Phone", value: siteConfig.phone },
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.whatsapp },
  { icon: Mail, label: "Email", value: siteConfig.email },
  { icon: MapPin, label: "Office", value: siteConfig.office },
];

export function ContactSection() {
  return (
    <Section id="contact" className="bg-secondary/60">
      <h2 className="max-w-2xl text-4xl md:text-6xl">
        Have a Project in Mind? Let&apos;s Talk.
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contacts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-3xl bg-card p-6">
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-4 text-xs tracking-widest text-muted-foreground uppercase">
              {label}
            </p>
            <p className="mt-1 font-medium wrap-break-word">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={siteConfig.phoneHref} variant="outline">
          Call Now
        </ButtonLink>
        <ButtonLink
          href={siteConfig.whatsappHref}
          variant="outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp Us
        </ButtonLink>
        <ButtonLink href="#enquiry">Book a Site Visit</ButtonLink>
      </div>
      {/* <ContactQrCard /> */}
    </Section>
  );
}
