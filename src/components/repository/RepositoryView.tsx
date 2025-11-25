"use client";

import { useState } from "react";
import { MusicLink } from "@/lib/content";
import { LinkCard } from "./LinkCard";
import { MindMap } from "./MindMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, Network, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface RepositoryViewProps {
  initialLinks: MusicLink[];
}

export function RepositoryView({ initialLinks }: RepositoryViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "mindmap">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Extract unique genres and platforms
  const allGenres = Array.from(new Set(initialLinks.flatMap((l) => l.genres))).sort();
  const allPlatforms = Array.from(new Set(initialLinks.map((l) => l.platform))).sort();

  // Filter links
  const filteredLinks = initialLinks.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre ? link.genres.includes(selectedGenre) : true;
    const matchesPlatform = selectedPlatform ? link.platform === selectedPlatform : true;

    return matchesSearch && matchesGenre && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card/30 p-4 rounded-lg border border-ocean-light backdrop-blur-md sticky top-4 z-10">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search music..."
              className="pl-8 bg-ocean-deep/50 border-ocean-light"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" /> Grid
          </Button>
          <Button
            variant={viewMode === "mindmap" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("mindmap")}
            className="gap-2"
          >
            <Network className="h-4 w-4" /> Mind Map
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground flex items-center gap-1"><Filter className="h-3 w-3"/> Platform:</span>
          <Badge
            variant={selectedPlatform === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20"
            onClick={() => setSelectedPlatform(null)}
          >
            All
          </Badge>
          {allPlatforms.map((platform) => (
            <Badge
              key={platform}
              variant={selectedPlatform === platform ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => setSelectedPlatform(platform === selectedPlatform ? null : platform)}
            >
              {platform}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground flex items-center gap-1"><Filter className="h-3 w-3"/> Genre:</span>
          <Badge
            variant={selectedGenre === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20"
            onClick={() => setSelectedGenre(null)}
          >
            All
          </Badge>
          {allGenres.map((genre) => (
            <Badge
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <LinkCard key={link.slug} link={link} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No music found matching your filters.
              </div>
            )}
          </div>
        ) : (
          <MindMap links={filteredLinks} />
        )}
      </div>
    </div>
  );
}
