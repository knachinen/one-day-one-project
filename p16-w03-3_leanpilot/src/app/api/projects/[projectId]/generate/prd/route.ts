import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { generatePrdMarkdown } from "@/lib/utils/generate-prd";

export async function GET(
	_request: Request,
	{ params }: { params: { projectId: string } },
) {
	const { user } = await validateRequest();

	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const resolvedParams = await params; // Assume params is the Promise-like object
	const projectId = resolvedParams.projectId;

	try {
		const markdownContent = await generatePrdMarkdown(projectId);
		return new NextResponse(markdownContent, {
			status: 200,
			headers: {
				"Content-Type": "text/markdown",
				"Content-Disposition": `attachment; filename="PRD-${projectId}.md"`,
			},
		});
	} catch (error: any) {
        console.error("PRD generation API error:", error);
		return new NextResponse(JSON.stringify({ error: error.message || String(error) }), { status: 500 });
	}
}
