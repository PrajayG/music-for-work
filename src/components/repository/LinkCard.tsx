import { MusicLink } from "@/lib/content";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface LinkCardProps {
  link: MusicLink;
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl font-mono text-ocean-foam">{link.title}</CardTitle>
          <Badge variant="outline" className="shrink-0 text-primary border-primary/30">
            {link.platform}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 text-ocean-mist">
          {link.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {link.genres.map((genre) => (
            <Badge key={genre} variant="secondary" className="bg-ocean-deep text-ocean-mist hover:bg-ocean-light">
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-mono"
        >
          LISTEN NOW <ExternalLink className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}
