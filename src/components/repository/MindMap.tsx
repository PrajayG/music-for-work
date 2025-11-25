"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MusicLink } from "@/lib/content";
// import { useTheme } from "next-themes"; // Removed unused import
// Since we are using manual tailwind dark mode or just variables, we can read computed styles or hardcode colors matching our theme.

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <div className="mindmap__loading">Loading Mind Map...</div>,
});

interface MindMapProps {
  links: MusicLink[];
}

export function MindMap({ links }: MindMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const graphData = useMemo(() => {
    const nodes: any[] = [];
    const linksData: any[] = [];
    const genres = new Set<string>();

    // Create Genre Nodes
    links.forEach((link) => {
      link.genres.forEach((genre) => genres.add(genre));
    });

    genres.forEach((genre) => {
      nodes.push({ id: genre, group: "genre", val: 20 });
    });

    // Create Link Nodes and Edges
    links.forEach((link) => {
      nodes.push({ id: link.title, group: "link", val: 10, ...link });
      link.genres.forEach((genre) => {
        linksData.push({ source: genre, target: link.title });
      });
    });

    return { nodes, links: linksData };
  }, [links]);

  return (
    <div ref={containerRef} className="mindmap">
      <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeLabel="id"
        nodeColor={(node: any) => (node.group === "genre" ? "#38bdf8" : "#f472b6")} // Primary vs Pink
        linkColor={() => "#1e293b"} // Muted
        backgroundColor="#0b1026" // Ocean Deep
        nodeRelSize={6}
        linkWidth={2}
        cooldownTicks={100}
        onNodeClick={(node: any) => {
            if (node.group === "link" && node.url) {
                window.open(node.url, "_blank");
            }
        }}
      />
    </div>
  );
}
