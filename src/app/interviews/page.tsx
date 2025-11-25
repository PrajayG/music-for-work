import { getAllInterviews } from "@/lib/content";
import { InterviewCard } from "@/components/interviews/InterviewCard";

export default function InterviewsPage() {
  const interviews = getAllInterviews();

  return (
    <main className="interviews">
      <div className="interviews__header">
        <h1 className="interviews__title">
          INTERVIEWS
        </h1>
        <p className="interviews__description">
          Conversations with creators about their workflow, focus habits, and the music that powers them.
        </p>
      </div>

      <div className="interviews__grid">
        {interviews.map((interview) => (
          <InterviewCard key={interview.slug} interview={interview} />
        ))}
      </div>
    </main>
  );
}
