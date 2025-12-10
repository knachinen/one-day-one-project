import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import StageNavigation from "@/components/stage-navigation";
import Stage1Form from "@/components/stage1-form";
import Stage2Form from "@/components/stage2-form";
import Stage3Form from "@/components/stage3-form";
import Stage4Form from "@/components/stage4-form";
import Stage5Form from "@/components/stage5-form";
import { Card, CardContent } from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjectTable } from "@/lib/db/schema";

interface StagePageProps {
	params: {
		projectId: string;
		stageNumber: string;
	};
}

export default async function StagePage({ params }: StagePageProps) {
	const { user } = await validateRequest();

	if (!user) {
		return redirect("/login");
	}

	const resolvedParams = await params; // Assume params is the Promise-like object
	const { projectId, stageNumber } = resolvedParams;
	const currentStage = parseInt(stageNumber, 10);

	if (Number.isNaN(currentStage) || currentStage < 1 || currentStage > 5) {
		return notFound();
	}

	const project = await db.query.ProjectTable.findFirst({
		where: eq(ProjectTable.id, projectId),
	});

	if (!project || project.userId !== user.id) {
		return notFound();
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-8 lg:p-24">
			<div className="w-full max-w-4xl mb-8">
				<h1 className="text-4xl font-bold mb-2">Project: {project.title}</h1>
				<p className="text-lg text-muted-foreground">
					Industry: {project.industry} | Status: {project.status}
				</p>
			</div>

			<div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
				<aside className="lg:w-1/4">
					<StageNavigation projectId={projectId} currentStage={currentStage} />
				</aside>
				<section className="lg:w-3/4">
					<Card>
						<CardContent className="p-6">
							<h2 className="text-2xl font-semibold mb-4">
								Stage {currentStage}: {getStageTitle(currentStage)}
							</h2>
							{currentStage === 1 && <Stage1Form projectId={projectId} />}
							{currentStage === 2 && <Stage2Form projectId={projectId} />}
							{currentStage === 3 && <Stage3Form projectId={projectId} />}
							{currentStage === 4 && <Stage4Form projectId={projectId} />}
							{currentStage === 5 && <Stage5Form projectId={projectId} />}
							{currentStage !== 1 &&
								currentStage !== 2 &&
								currentStage !== 3 &&
								currentStage !== 4 &&
								currentStage !== 5 && (
									<p className="text-muted-foreground">
										This is the content for Stage {currentStage}.
									</p>
								)}
						</CardContent>
					</Card>
				</section>
			</div>
		</main>
	);
}

function getStageTitle(stageNumber: number): string {
	switch (stageNumber) {
		case 1:
			return "Problem Discovery";
		case 2:
			return "Solution Definition";
		case 3:
			return "MVP Scoping";
		case 4:
			return "Validation Plan";
		case 5:
			return "Execution Roadmap";
		default:
			return "Unknown Stage";
	}
}
