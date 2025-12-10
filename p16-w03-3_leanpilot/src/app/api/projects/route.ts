import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjectTable } from "@/lib/db/schema";

export async function GET() {
	const { user } = await validateRequest();

	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const projects = await db.query.ProjectTable.findMany({
		where: eq(ProjectTable.userId, user.id),
	});

	return NextResponse.json(projects);
}

export async function POST(req: Request) {
	const { user } = await validateRequest();

	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const { title, industry } = await req.json();

	if (!title || !industry) {
		return new NextResponse("Missing title or industry", { status: 400 });
	}

	const projectId = generateId(15);

	const newProject = await db
		.insert(ProjectTable)
		.values({
			id: projectId,
			userId: user.id,
			title,
			industry,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		})
		.returning();

	return NextResponse.json(newProject[0], { status: 201 });
}
