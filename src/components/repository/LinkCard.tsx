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
    <Card className="link-card link-card--interactive">
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <CardTitle>{link.title}</CardTitle>
          <Badge variant="outline" className="link-card__platform-badge">
            {link.platform}
          </Badge>
        </div>
        <CardDescription>
          {link.description}
        </CardDescription>
      </CardHeader>
      <CardContent style={{ flex: 1 }}>
        <div className="link-card__genres">
          {link.genres.map((genre) => (
            <Badge key={genre} variant="secondary">
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
          className="link-card__link"
        >
          LISTEN NOW <ExternalLink style={{ height: '12px', width: '12px' }} />
        </Link>
      </CardFooter>
    </Card>
  );
}
