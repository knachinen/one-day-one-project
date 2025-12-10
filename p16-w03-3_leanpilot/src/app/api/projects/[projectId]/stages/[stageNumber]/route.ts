import { and, eq } from "drizzle-orm";
import { generateId } from "lucia";
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjectTable, StageResponseTable } from "@/lib/db/schema";

export async function POST(
	req: Request,
	{ params }: { params: { projectId: string; stageNumber: string } },
) {
    try {
        const { user } = await validateRequest();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const resolvedParams = await params; // Assume params is the Promise-like object
        const { projectId, stageNumber: stageNumberParam } = resolvedParams;
        const stageNumber = parseInt(stageNumberParam, 10);

        if (Number.isNaN(stageNumber) || stageNumber < 1 || stageNumber > 5) {
            return new NextResponse("Invalid stage number", { status: 400 });
        }

        const data = await req.json(); // The form data from the client

        // For each question in the stage, save its answer
        for (const questionId in data) {
            const answer = data[questionId];

            // Check if a response for this question already exists for this project and stage
            const existingResponse = await db.query.StageResponseTable.findFirst({
                where: and(
                    eq(StageResponseTable.projectId, projectId),
                    eq(StageResponseTable.stageNumber, stageNumber),
                    eq(StageResponseTable.questionId, questionId),
                ),
            });

            if (existingResponse) {
                // Update existing response
                await db
                    .update(StageResponseTable)
                    .set({
                        answer: JSON.stringify(answer), // Store as stringified JSON if answer is complex
                        createdAt: new Date().toISOString(),
                    })
                    .where(eq(StageResponseTable.id, existingResponse.id));
            } else {
                // Insert new response
                await db.insert(StageResponseTable).values({
                    id: generateId(15),
                    projectId,
                    stageNumber,
                    questionId,
                    answer: JSON.stringify(answer), // Store as stringified JSON
                    createdAt: new Date().toISOString(),
                });
            }
        }

        // Update project's currentStage and completionRate
        const completionRate = Math.min(100, (stageNumber / 5) * 100);

        // Fetch the existing project to get its currentStage
        const existingProject = await db.query.ProjectTable.findFirst({
            where: eq(ProjectTable.id, projectId),
        });

        if (!existingProject) {
            throw new Error("Project not found during stage update.");
        }

        await db
            .update(ProjectTable)
            .set({
                currentStage: Math.max(stageNumber, existingProject.currentStage), // Use existingProject.currentStage
                completionRate: completionRate,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(ProjectTable.id, projectId));

        return new NextResponse("Stage data saved successfully", { status: 200 });
    } catch (error: any) {
        console.error("Stage API POST error:", error);
        return new NextResponse(JSON.stringify({ error: error.message || String(error) }), { status: 500 });
    }
}

export async function GET(
	_req: Request,
	{ params }: { params: { projectId: string; stageNumber: string } },
) {
    try { // Added try block
        const { user } = await validateRequest();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const resolvedParams = await params; // Assume params is the Promise-like object
        const { projectId, stageNumber: stageNumberParam } = resolvedParams;
        const stageNumber = parseInt(stageNumberParam, 10);

        if (Number.isNaN(stageNumber) || stageNumber < 1 || stageNumber > 5) {
            return new NextResponse("Invalid stage number", { status: 400 });
        }

        const responses = await db.query.StageResponseTable.findMany({
            where: and(
                eq(StageResponseTable.projectId, projectId),
                eq(StageResponseTable.stageNumber, stageNumber),
            ),
        });

        // Reconstruct data into a single object { questionId: answer }
        const stageData: Record<string, any> = {};
        responses.forEach((res) => {
            stageData[res.questionId] = JSON.parse(res.answer); // Parse back to original type
        });

        return NextResponse.json(stageData);
    } catch (error: any) { // Added catch block
        console.error("Stage API GET error:", error);
        return new NextResponse(JSON.stringify({ error: error.message || String(error) }), { status: 500 });
    }
}
