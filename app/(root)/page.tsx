import ClientWrapper from "@/components/overlay/client-wrapper";
import { Footer } from "@/components/ui/footer";
import { Greeting } from "@/components/ui/greeting";
import { Hero } from "@/components/ui/hero";

export default function Home() {
  return (
    <ClientWrapper>
      {/* Greeting */}
      <section>
        <Greeting />
      </section>

      {/* Overlay */}
      <div className="h-screen"></div>

      {/* Main Content */}
      <section id="home" className="px-4 xl:px-8 scroll-mt-8">
        <Hero />
      </section>

      {/* Footer */}
      <section className="px-4 xl:px-8">
        <Footer />
      </section>
    </ClientWrapper>
  );
}
