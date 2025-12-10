import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjectTable } from "@/lib/db/schema";

export async function GET(
	_request: Request,
	{ params }: { params: { projectId: string } },
) {
	const { user } = await validateRequest();

	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const projectId = params.projectId;
	const project = await db.query.ProjectTable.findFirst({
		where: eq(ProjectTable.id, projectId),
	});

	if (!project || project.userId !== user.id) {
		return new NextResponse("Project not found or unauthorized", {
			status: 404,
		});
	}

	return NextResponse.json(project);
}

export async function PUT(
	request: Request,
	{ params }: { params: { projectId: string } },
) {
	const { user } = await validateRequest();

	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const projectId = params.projectId;
	const existingProject = await db.query.ProjectTable.findFirst({
		where: eq(ProjectTable.id, projectId),
	});

	if (!existingProject || existingProject.userId !== user.id) {
		return new NextResponse("Project not found or unauthorized", {
			status: 404,
		});
	}

	const { title, industry, status, currentStage, completionRate } =
		await request.json();

	const updatedProject = await db
		.update(ProjectTable)
		.set({
			title: title ?? existingProject.title,
			industry: industry ?? existingProject.industry,
			status: status ?? existingProject.status,
			currentStage: currentStage ?? existingProject.currentStage,
			completionRate: completionRate ?? existingProject.completionRate,
			updatedAt: new Date().toISOString(),
		})
		.where(eq(ProjectTable.id, projectId))
		.returning();

	return NextResponse.json(updatedProject[0]);
}

export async function DELETE(
	_request: Request,
	{ params }: { params: { projectId: string } },
) {
	const { user } = await validateRequest();

	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const projectId = params.projectId;
	const existingProject = await db.query.ProjectTable.findFirst({
		where: eq(ProjectTable.id, projectId),
	});

	if (!existingProject || existingProject.userId !== user.id) {
		return new NextResponse("Project not found or unauthorized", {
			status: 404,
		});
	}

	await db.delete(ProjectTable).where(eq(ProjectTable.id, projectId));

	return new NextResponse(null, { status: 204 });
}
