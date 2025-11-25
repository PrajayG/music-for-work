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
      <Card className="h-full hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm cursor-pointer group">
        <CardHeader>
          <CardTitle className="text-xl font-mono text-ocean-foam group-hover:text-primary transition-colors">
            {interview.title}
          </CardTitle>
          <CardDescription className="flex items-center gap-4 text-sm mt-2">
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {interview.interviewee}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {interview.date}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {interview.role}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
