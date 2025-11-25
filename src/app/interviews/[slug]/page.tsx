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
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/interviews">
        <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all text-ocean-mist hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Interviews
        </Button>
      </Link>

      <article className="space-y-8">
        <header className="space-y-4 border-b border-ocean-light pb-8">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary/30">Interview</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {interview.date}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-ocean-foam leading-tight">
            {interview.title}
          </h1>
          
          <div className="flex items-center gap-3 text-lg text-ocean-mist">
            <User className="h-5 w-5" />
            <span className="font-semibold text-ocean-foam">{interview.interviewee}</span>
            <span className="text-muted-foreground">•</span>
            <span>{interview.role}</span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-mono prose-headings:text-ocean-foam prose-p:text-ocean-mist prose-a:text-primary hover:prose-a:text-primary/80">
          <MarkdownRenderer content={interview.content} />
        </div>
      </article>
    </main>
  );
}
