import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Headphones, Mic } from "lucide-react";

export default function Home() {
  return (
    <div className="homepage">
      <main className="homepage__main">
        <div className="homepage__content">
          <h1 className="homepage__title">
            MUSIC<br />FOR<br />WORK
          </h1>
          <p className="homepage__subtitle">
            Curated soundscapes for deep focus and creative flow.
          </p>
        </div>

        <div className="homepage__actions">
          <Link href="/repository">
            <Button size="lg">
              <Headphones />
              Enter Repository
            </Button>
          </Link>
          <Link href="/interviews">
            <Button size="lg" variant="outline">
              <Mic />
              Read Interviews
            </Button>
          </Link>
        </div>
      </main>

      <footer className="homepage__footer">
        <p>© 2024 Music For Work</p>
      </footer>
    </div>
  );
}
