import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { subjects } from "@/content/subjects";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/subjects-pricing", priority: 0.9 },
  { path: "/assessment", priority: 0.9 },
  { path: "/resources", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/book", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/guarantee-terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const assessmentRoutes = subjects.flatMap((subject) =>
    subject.assessmentLevels.map((level) => ({
      url: `${site.url}/assessment/${subject.id}/${level}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...assessmentRoutes,
  ];
}
