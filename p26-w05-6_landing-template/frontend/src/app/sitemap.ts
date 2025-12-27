import { Metadata, Route } from "next";

export default function sitemap(): Metadata & { url: string; lastModified?: string | Date; changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"; priority?: number }[] {
  return [
    {
      url: "https://dataflow.example.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
