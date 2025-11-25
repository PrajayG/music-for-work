import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones, Mic } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
        </div>

        <div className="z-10 space-y-6 max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-mono font-bold tracking-tighter text-ocean-foam">
            MUSIC<br />FOR<br />WORK
          </h1>
          <p className="text-xl md:text-2xl text-ocean-mist font-light">
            Curated soundscapes for deep focus and creative flow.
          </p>
        </div>

        <div className="z-10 flex flex-col md:flex-row gap-6 w-full max-w-md">
          <Link href="/repository" className="w-full">
            <Button size="lg" className="w-full h-16 text-lg gap-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Headphones className="h-6 w-6" />
              Enter Repository
            </Button>
          </Link>
          <Link href="/interviews" className="w-full">
            <Button size="lg" variant="outline" className="w-full h-16 text-lg gap-3 border-ocean-light hover:bg-ocean-light/50 text-ocean-foam">
              <Mic className="h-6 w-6" />
              Read Interviews
            </Button>
          </Link>
        </div>
      </main>

      <footer className="p-6 text-center text-ocean-mist text-sm font-mono opacity-60">
        <p>© 2024 Music For Work. Designed with Japanese Minimalism.</p>
      </footer>
    </div>
  );
}
