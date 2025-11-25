import { getAllLinks } from "@/lib/content";
import { RepositoryView } from "@/components/repository/RepositoryView";

export default function RepositoryPage() {
  const links = getAllLinks();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-mono font-bold text-ocean-foam tracking-tight">
          MUSIC REPOSITORY
        </h1>
        <p className="text-ocean-mist max-w-2xl">
          A curated collection of soundscapes for deep work, coding, and creative flow.
          Explore by genre or visualize the connections.
        </p>
      </div>
      
      <RepositoryView initialLinks={links} />
    </main>
  );
}
