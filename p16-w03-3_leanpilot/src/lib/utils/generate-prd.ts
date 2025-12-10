import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { ProjectTable, StageResponseTable } from "@/lib/db/schema";

export async function generatePrdMarkdown(projectId: string): Promise<string> {
	const project = await db.query.ProjectTable.findFirst({
		where: eq(ProjectTable.id, projectId),
	});

	if (!project) {
		throw new Error("Project not found.");
	}

	const stageResponses = await db.query.StageResponseTable.findMany({
		where: eq(StageResponseTable.projectId, projectId),
	});

	const formattedResponses: Record<number, Record<string, any>> = {};
	stageResponses.forEach((response) => {
		if (!formattedResponses[response.stageNumber]) {
			formattedResponses[response.stageNumber] = {};
		}
		try {
			formattedResponses[response.stageNumber][response.questionId] =
				JSON.parse(response.answer);
		} catch {
			formattedResponses[response.stageNumber][response.questionId] =
				response.answer;
		}
	});

	let markdown = `# ${project.title} MVP Product Requirements Document\n\n`;

	// 1. Executive Summary
	markdown += `## 1. Executive Summary\n`;
	const stage2 = formattedResponses[2];
	if (stage2?.tagline) {
		markdown += `- One-Sentence Summary: ${stage2.tagline}\n`;
	}
	const stage1 = formattedResponses[1];
	if (stage1?.problem) {
		markdown += `- Problem Definition: ${stage1.problem}\n`;
	}
	if (stage2?.solutionOverview) {
		markdown += `- Solution Overview: ${stage2.solutionOverview}\n`;
	}
	if (stage1?.targetCustomer) {
		markdown += `- Target Customer: ${stage1.targetCustomer}\n\n`;
	}

	// 2. Problem & Solution
	markdown += `## 2. Problem & Solution\n`;
	if (stage1?.problem) {
		markdown += `- Problem Statement: ${stage1.problem}\n`;
	}
	if (stage2?.solutionOverview) {
		markdown += `- Solution Overview: ${stage2.solutionOverview}\n`;
	}
	if (stage2?.valueProposition) {
		markdown += `- Value Proposition: ${stage2.valueProposition}\n`;
	}
	if (stage1?.currentAlternatives) {
		markdown += `- Competitive Analysis: Users currently solve this by: ${stage1.currentAlternatives}. Limitations: ${stage1.alternativesLimitations}\n\n`;
	}

	// 3. MVP Scope
	markdown += `## 3. MVP Scope\n`;
	const stage3 = formattedResponses[3];
	if (stage3?.mustHaveFeatures && Array.isArray(stage3.mustHaveFeatures)) {
		markdown += `- Must-Have Features:\n`;
		stage3.mustHaveFeatures.forEach((feature: any) => {
			markdown += `  - ${feature.name} (Priority: ${feature.priority}, Purpose: ${feature.purpose})\n`;
		});
	}
	if (stage3?.niceToHaveFeatures && Array.isArray(stage3.niceToHaveFeatures)) {
		markdown += `- Should-Have Features (for v1.1+):\n`;
		stage3.niceToHaveFeatures.forEach((feature: any) => {
			markdown += `  - ${feature.name} (Priority: ${feature.priority}, Purpose: ${feature.purpose})\n`;
		});
	}
	if (stage3?.excludedItems) {
		markdown += `- Won't-Have Features (from v1): ${stage3.excludedItems}\n`;
	}
	if (stage3?.userFlow && Array.isArray(stage3.userFlow)) {
		markdown += `- User Flow:\n`;
		markdown += "```mermaid\n";
		markdown += "graph TD\n";
		stage3.userFlow.forEach((step: any, index: number) => {
			// Basic flow: A --> B --> C
			if (index > 0) {
				markdown += `  Step${index} --> Step${index + 1}\n`;
			}
			markdown += `  Step${index + 1}(${step.description})\n`;
		});
		markdown += "```\n";
	}
	markdown += "\n";

	// 4. Success Metrics
	markdown += `## 4. Success Metrics\n`;
	const stage4 = formattedResponses[4];
	if (stage4?.preMvpValidation && Array.isArray(stage4.preMvpValidation)) {
		markdown += `- Pre-MVP Validation: ${stage4.preMvpValidation.join(", ")}\n`;
	}
	if (stage4?.preMvpGoal) {
		markdown += `- Pre-MVP Validation Goal: ${stage4.preMvpGoal}\n`;
	}
	if (stage4?.postMvpMetrics && Array.isArray(stage4.postMvpMetrics)) {
		markdown += `- Post-MVP Metrics:\n`;
		stage4.postMvpMetrics.forEach((metric: any, index: number) => {
			markdown += `  - Metric ${index + 1}: ${metric.description}\n`;
		});
	}
	if (stage4?.measurementTools) {
		markdown += `- Measurement Tools: ${stage4.measurementTools}\n`;
	}
	if (stage4?.successCriteria) {
		markdown += `- Success Criteria: ${stage4.successCriteria}\n`;
	}
	if (stage4?.pivotTriggers) {
		markdown += `- Pivot Triggers: ${stage4.pivotTriggers}\n\n`;
	}

	// 5. Execution Plan
	markdown += `## 5. Execution Plan\n`;
	const stage5 = formattedResponses[5];
	if (stage5?.devPeriod) {
		markdown += `- Development Period: ${stage5.devPeriod}\n`;
	}
	if (stage5?.devMethod) {
		markdown += `- Development Method: ${stage5.devMethod}\n`;
	}
	if (stage5?.techStack) {
		markdown += `- Tech Stack: ${stage5.techStack}\n`;
	}
	if (stage5?.milestones && Array.isArray(stage5.milestones)) {
		markdown += `- Milestones:\n`;
		markdown += "```mermaid\n";
		markdown += "gantt\n";
		markdown += "dateFormat  YYYY-MM-DD\n";
		markdown += "title MVP Development Timeline\n";

		// A simple way to represent duration based on milestone index and a fixed start date
		const startDate = new Date(); // Start from today for simplicity
		stage5.milestones.forEach((milestone: any, index: number) => {
			const start = new Date(startDate);
			start.setDate(startDate.getDate() + index * 7); // Each milestone roughly a week apart
			const end = new Date(start);
			end.setDate(start.getDate() + 5); // Each milestone takes 5 days
			markdown += `  ${milestone.description}: milestone${index}, ${start.toISOString().slice(0, 10)}, ${end.toISOString().slice(0, 10)}\n`;
		});
		markdown += "```\n";
	}
	if (stage5?.launchChannels && Array.isArray(stage5.launchChannels)) {
		markdown += `- Launch Channels: ${stage5.launchChannels.join(", ")}\n`;
	}
	if (stage5?.marketingChannels) {
		markdown += `- Marketing Channels: ${stage5.marketingChannels}\n`;
	}
	if (stage5?.estimatedCost) {
		markdown += `- Estimated Cost: ${stage5.estimatedCost}\n`;
	}
	if (stage5?.teamStatus) {
		markdown += `- Team Status: ${stage5.teamStatus}\n\n`;
	}

	// 6. Key Hypotheses
	if (stage2?.hypothesis1 || stage2?.hypothesis2 || stage2?.hypothesis3) {
		markdown += `## 6. Key Hypotheses\n`;
		if (stage2?.hypothesis1) {
			markdown += `- Hypothesis 1: ${stage2.hypothesis1}\n`;
		}
		if (stage2?.hypothesis2) {
			markdown += `- Hypothesis 2: ${stage2.hypothesis2}\n`;
		}
		if (stage2?.hypothesis3) {
			markdown += `- Hypothesis 3: ${stage2.hypothesis3}\n`;
		}
	}

	return markdown;
}
