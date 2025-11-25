import fs from "fs";
import path from "path";
import matter from "gray-matter";

const linksDirectory = path.join(process.cwd(), "content/links");
const interviewsDirectory = path.join(process.cwd(), "content/interviews");

export interface MusicLink {
  slug: string;
  title: string;
  description: string;
  platform: "Spotify" | "YouTube" | "SoundCloud" | "Apple Music" | "Other";
  url: string;
  genres: string[];
  date: string;
}

export interface Interview {
  slug: string;
  title: string;
  interviewee: string;
  role: string;
  date: string;
  content: string;
  image?: string;
}

export function getAllLinks(): MusicLink[] {
  if (!fs.existsSync(linksDirectory)) return [];
  
  const fileNames = fs.readdirSync(linksDirectory);
  const allLinksData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(linksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    } as MusicLink;
  });

  return allLinksData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllInterviews(): Interview[] {
  if (!fs.existsSync(interviewsDirectory)) return [];

  const fileNames = fs.readdirSync(interviewsDirectory);
  const allInterviewsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(interviewsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    } as Interview;
  });

  return allInterviewsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInterviewBySlug(slug: string): Interview | null {
  const fullPath = path.join(interviewsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    content,
    ...data,
  } as Interview;
}
