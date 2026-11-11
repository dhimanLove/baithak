import { ClosingCta } from "@/components/landing/ClosingCta";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { StatsBand } from "@/components/landing/StatsBand";
import { getMeetings } from "@/lib/api";

export default async function Home() {
  const [meeting] = await getMeetings();

  return (
    <main id="main" className="page">
      <Hero meeting={meeting} />
      <ProductPreview meeting={meeting} />
      <Features />
      <StatsBand meeting={meeting} />
      <ClosingCta />
    </main>
  );
}
