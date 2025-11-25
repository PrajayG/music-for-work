import { getInterviewBySlug, getAllInterviews } from "@/lib/content";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const interviews = getAllInterviews();
  return interviews.map((interview) => ({
    slug: interview.slug,
  }));
}

export default async function InterviewPage({ params }: PageProps) {
  const { slug } = await params;
  const interview = getInterviewBySlug(slug);

  if (!interview) {
    notFound();
  }

  return (
    <main className="interview-detail">
      <Link href="/interviews">
        <Button variant="ghost" className="interview-detail__back-button">
          <ArrowLeft style={{ marginRight: '8px', height: '16px', width: '16px' }} /> Back to Interviews
        </Button>
      </Link>

      <article className="interview-detail__article">
        <header className="interview-detail__header">
          <div className="interview-detail__badges">
            <Badge variant="outline">Interview</Badge>
            <span className="interview-detail__date">
              <Calendar style={{ height: '12px', width: '12px' }} /> {interview.date}
            </span>
          </div>
          
          <h1 className="interview-detail__title">
            {interview.title}
          </h1>
          
          <div className="interview-detail__interviewee-info">
            <User style={{ height: '20px', width: '20px' }} />
            <span className="interview-detail__interviewee-name">{interview.interviewee}</span>
            <span>•</span>
            <span>{interview.role}</span>
          </div>
        </header>

        <div className="interview-detail__content">
          <MarkdownRenderer content={interview.content} />
        </div>
      </article>
    </main>
  );
}
