import { Header } from "@/components/layout/header";
import { Hero } from "@/features/home/components/hero";
import { QuickEnquiry } from "@/features/home/components/enquiry-form";
import {
  AboutSection,
  BenefitsSection,
  ContactSection,
  EnquirySection,
  FarmhouseSection,
  LocationSection,
  PossibilitiesSection,
  ProjectsSection,
  StatisticsSection,
  VisitSection,
} from "@/features/home/components/sections";
import { Gallery } from "@/features/home/components/gallery";
import { ContactActions, Footer } from "@/components/layout/footer";
import { ProjectMedia } from "@/features/home/components/project-media";

export default function HomePage() {
  return (
    <div className="pb-16 md:pb-0">
      <Header />
      <main id="main-content">
        <Hero />
        <QuickEnquiry />
        <AboutSection />
        <ProjectsSection />
        <ProjectMedia />
        <BenefitsSection />
        <LocationSection />
        <StatisticsSection />
        <FarmhouseSection />
        <PossibilitiesSection />
        <Gallery />
        <VisitSection />
        <EnquirySection />
        <ContactSection />
      </main>
      <Footer />
      <ContactActions />
    </div>
  );
}
