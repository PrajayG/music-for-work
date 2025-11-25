import { getAllLinks } from "@/lib/content";
import { RepositoryView } from "@/components/repository/RepositoryView";

export default function RepositoryPage() {
  const links = getAllLinks();

  return (
    <main className="repository">
      <div className="repository__header">
        <h1 className="repository__title">
          MUSIC REPOSITORY
        </h1>
        <p className="repository__description">
          A curated collection of soundscapes for deep work, coding, and creative flow.
          Explore by genre or visualize the connections.
        </p>
      </div>
      
      <RepositoryView initialLinks={links} />
    </main>
  );
}
