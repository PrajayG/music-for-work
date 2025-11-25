"use client";

import { useState } from "react";
import { MusicLink } from "@/lib/content";
import { LinkCard } from "./LinkCard";
import { MindMap } from "./MindMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, Network, Search, Filter } from "lucide-react";

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
    <div className="repository-view">
      {/* Controls Header */}
      <div className="repository-view__controls">
        <div className="repository-view__search-wrapper">
          <Search className="repository-view__search-icon" style={{ height: '16px', width: '16px' }} />
          <Input
            placeholder="Search music..."
            style={{ paddingLeft: '36px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="repository-view__view-buttons">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid style={{ height: '16px', width: '16px' }} /> Grid
          </Button>
          <Button
            variant={viewMode === "mindmap" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("mindmap")}
          >
            <Network style={{ height: '16px', width: '16px' }} /> Mind Map
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="repository-view__filters">
        <span className="repository-view__filter-label">
          <Filter style={{ height: '12px', width: '12px' }} /> Platform:
        </span>
        <Badge
          variant={selectedPlatform === null ? "default" : "outline"}
          clickable
          onClick={() => setSelectedPlatform(null)}
        >
          All
        </Badge>
        {allPlatforms.map((platform) => (
          <Badge
            key={platform}
            variant={selectedPlatform === platform ? "default" : "outline"}
            clickable
            onClick={() => setSelectedPlatform(platform === selectedPlatform ? null : platform)}
          >
            {platform}
          </Badge>
        ))}
      </div>
        
      <div className="repository-view__filters">
        <span className="repository-view__filter-label">
          <Filter style={{ height: '12px', width: '12px' }} /> Genre:
        </span>
        <Badge
          variant={selectedGenre === null ? "default" : "outline"}
          clickable
          onClick={() => setSelectedGenre(null)}
        >
          All
        </Badge>
        {allGenres.map((genre) => (
          <Badge
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            clickable
            onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
          >
            {genre}
          </Badge>
        ))}
      </div>

      {/* Content Area */}
      <div className="repository-view__content">
        {viewMode === "grid" ? (
          <div className="repository-view__grid">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <LinkCard key={link.slug} link={link} />
              ))
            ) : (
              <div className="repository-view__empty">
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
