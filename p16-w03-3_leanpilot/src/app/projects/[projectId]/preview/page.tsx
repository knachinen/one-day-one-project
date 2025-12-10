import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MermaidChart from "@/components/mermaid-chart";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjectTable } from "@/lib/db/schema";

interface PreviewPageProps {
	params: {
		projectId: string;
	};
}

export default async function PreviewPage({ params }: PreviewPageProps) {
	const { user } = await validateRequest();

	if (!user) {
		return redirect("/login");
	}

	const projectId = params.projectId;

	const project = await db.query.ProjectTable.findFirst({
		where: eq(ProjectTable.id, projectId),
	});

	if (!project || project.userId !== user.id) {
		return notFound();
	}

	let markdownContent = "";
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/projects/${projectId}/generate/prd`,
			{
				headers: {
					Cookie: `lucia_session=${user.id}`, // Pass session cookie for authorization
				},
			},
		);
		if (!response.ok) {
			throw new Error("Failed to fetch PRD content.");
		}
		markdownContent = await response.text();
	} catch (error) {
		console.error("Error fetching PRD content:", error);
		markdownContent =
			"## Error loading PRD\nAn error occurred while loading the PRD content.";
	}

	const components = {
		code({ node, inline, className, children, ...props }: any) {
			const match = /language-(\w+)/.exec(className || "");
			if (match?.[1] === "mermaid") {
				return <MermaidChart chart={String(children)} />;
			}
			return (
				<code className={className} {...props}>
					{children}
				</code>
			);
		},
	};

	return (
		<main className="flex min-h-screen flex-col items-center p-8 lg:p-24">
			<div className="w-full max-w-4xl mb-8 flex justify-between items-center">
				<div className="text-left">
					<h1 className="text-4xl font-bold mb-2">
						PRD Preview: {project.title}
					</h1>
					<p className="text-lg text-muted-foreground">
						Review your generated Product Requirements Document.
					</p>
				</div>
				<div className="flex gap-4">
					<Button asChild>
						<Link
							href={`/api/projects/${projectId}/generate/prd`}
							download={`PRD-${project.title}.md`}
						>
							Download .md
						</Link>
					</Button>
					<Button asChild>
						<Link
							href={`/api/projects/${projectId}/generate/pdf`}
							target="_blank"
						>
							Download .pdf
						</Link>
					</Button>
				</div>
			</div>

			<div className="w-full max-w-4xl prose lg:prose-xl dark:prose-invert border p-8 rounded-lg">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					components={components}
				>
					{markdownContent}
				</ReactMarkdown>
			</div>
		</main>
	);
}
