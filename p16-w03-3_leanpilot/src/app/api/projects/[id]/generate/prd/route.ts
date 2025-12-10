import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { generatePrdMarkdown } from "@/lib/utils/generate-prd";

export async function GET(
	_request: Request,
	{ params }: { params: { id: string } },
) {
	const { user } = await validateRequest();

	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const projectId = params.id;

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
		return new NextResponse(error.message, { status: 500 });
	}
}
