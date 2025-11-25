import { Interview } from "@/lib/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

interface InterviewCardProps {
  interview: Interview;
}

export function InterviewCard({ interview }: InterviewCardProps) {
  return (
    <Link href={`/interviews/${interview.slug}`}>
      <Card className="interview-card">
        <CardHeader>
          <CardTitle>
            {interview.title}
          </CardTitle>
          <CardDescription className="interview-card__meta">
            <span className="interview-card__meta-item">
              <User style={{ height: '12px', width: '12px' }} /> {interview.interviewee}
            </span>
            <span className="interview-card__meta-item">
              <Calendar style={{ height: '12px', width: '12px' }} /> {interview.date}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="interview-card__role">
            {interview.role}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
