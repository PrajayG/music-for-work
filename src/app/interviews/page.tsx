import { getAllInterviews } from "@/lib/content";
import { InterviewCard } from "@/components/interviews/InterviewCard";

export default function InterviewsPage() {
  const interviews = getAllInterviews();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-mono font-bold text-ocean-foam tracking-tight">
          INTERVIEWS
        </h1>
        <p className="text-ocean-mist max-w-2xl">
          Conversations with creators about their workflow, focus habits, and the music that powers them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview) => (
          <InterviewCard key={interview.slug} interview={interview} />
        ))}
      </div>
    </main>
  );
}
