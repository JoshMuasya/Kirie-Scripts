import Hero from "@/components/Landing/Hero";
import Recent from "@/components/Landing/Recent";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Recent />
    </main>
  );
}
