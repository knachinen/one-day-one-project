import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "@/lib/db";
import { generatePrdMarkdown } from "./generate-prd";

// Mock the entire @/lib/db module
vi.mock("@/lib/db", () => {
	const mockDb = {
		query: {
			ProjectTable: {
				findFirst: vi.fn(),
			},
			StageResponseTable: {
				findMany: vi.fn(),
			},
		},
	};
	return { db: mockDb };
});

// Explicitly mock @/env to use our custom mock file
vi.mock("@/env", async (importOriginal) => {
	const original = await importOriginal<typeof import("@/env")>();
	const mockEnv = await import("../__mocks__/env");
	return {
		...original, // Keep any original exports not explicitly mocked
		env: mockEnv.env,
	};
});

describe("generatePrdMarkdown", () => {
	const MOCK_PROJECT_ID = "project123";
	const MOCK_USER_ID = "user456";

	beforeEach(() => {
		// Reset mocks before each test
		vi.clearAllMocks();
	});

	it("should throw an error if project is not found", async () => {
		(db.query.ProjectTable.findFirst as vi.Mock).mockResolvedValue(undefined);

		await expect(generatePrdMarkdown(MOCK_PROJECT_ID)).rejects.toThrow(
			"Project not found.",
		);
	});

	it("should generate a PRD markdown with complete data", async () => {
		(db.query.ProjectTable.findFirst as vi.Mock).mockResolvedValue({
			id: MOCK_PROJECT_ID,
			userId: MOCK_USER_ID,
			title: "My Awesome MVP",
			industry: "SaaS",
			status: "InProgress",
			currentStage: 1,
			completionRate: 0,
			createdAt: "2025-01-01T00:00:00Z",
			updatedAt: "2025-01-01T00:00:00Z",
		});

		(db.query.StageResponseTable.findMany as vi.Mock).mockResolvedValue([
			// Stage 1
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 1,
				questionId: "problem",
				answer: "Users struggle with inefficient task management.",
			},
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 1,
				questionId: "targetCustomer",
				answer: "Small business owners.",
			},
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 1,
				questionId: "currentAlternatives",
				answer: "Spreadsheets and sticky notes.",
			},
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 1,
				questionId: "alternativesLimitations",
				answer: "Lack collaboration and automation.",
			},
			// Stage 2
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 2,
				questionId: "tagline",
				answer: "Streamline your workflow effortlessly.",
			},
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 2,
				questionId: "solutionOverview",
				answer: "A web app for task tracking and project collaboration.",
			},
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 2,
				questionId: "valueProposition",
				answer: "Save time and improve team productivity.",
			},
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 2,
				questionId: "hypothesis1",
				answer: "Teams spend 20% of their time on manual task updates.",
			},
			// Stage 3
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 3,
				questionId: "mustHaveFeatures",
				answer: JSON.stringify([
					{
						name: "Task Creation",
						priority: "High",
						purpose: "Allow users to add tasks.",
					},
					{
						name: "Task Assignment",
						priority: "High",
						purpose: "Distribute tasks among team members.",
					},
				]),
			},
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 3,
				questionId: "userFlow",
				answer: JSON.stringify([
					{ description: "User logs in" },
					{ description: "Creates a project" },
					{ description: "Adds tasks" },
				]),
			},
			// Stage 4
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 4,
				questionId: "preMvpValidation",
				answer: JSON.stringify([
					"Landing page sign-ups",
					"Customer interviews",
				]),
			},
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 4,
				questionId: "postMvpMetrics",
				answer: JSON.stringify([
					{ description: "DAU of 100" },
					{ description: "Task completion rate of 80%" },
				]),
			},
			// Stage 5
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 5,
				questionId: "devPeriod",
				answer: "6 weeks",
			},
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 5,
				questionId: "milestones",
				answer: JSON.stringify([
					{ description: "Backend setup" },
					{ description: "Frontend UI" },
					{ description: "Beta launch" },
				]),
			},
		]);

		const markdown = await generatePrdMarkdown(MOCK_PROJECT_ID);

		expect(markdown).toContain(
			"# My Awesome MVP MVP Product Requirements Document",
		);
		expect(markdown).toContain("## 1. Executive Summary");
		expect(markdown).toContain(
			"- One-Sentence Summary: Streamline your workflow effortlessly.",
		);
		expect(markdown).toContain(
			"- Problem Definition: Users struggle with inefficient task management.",
		);
		expect(markdown).toContain("## 2. Problem & Solution");
		expect(markdown).toContain(
			"- Competitive Analysis: Users currently solve this by: Spreadsheets and sticky notes. Limitations: Lack collaboration and automation.",
		);
		expect(markdown).toContain("## 3. MVP Scope");
		expect(markdown).toContain("- Must-Have Features:");
		expect(markdown).toContain(
			"  - Task Creation (Priority: High, Purpose: Allow users to add tasks.)",
		);
		expect(markdown).toContain(
			"```mermaid\ngraph TD\n  Step1(User logs in)\n  Step1 --> Step2\n  Step2(Creates a project)\n  Step2 --> Step3\n  Step3(Adds tasks)\n```",
		);
		expect(markdown).toContain("## 4. Success Metrics");
		expect(markdown).toContain(
			"- Pre-MVP Validation: Landing page sign-ups, Customer interviews",
		);
		expect(markdown).toContain("## 5. Execution Plan");
		expect(markdown).toContain("- Milestones:");
		expect(markdown).toContain("```mermaid\ngantt");
		expect(markdown).toContain(
			"## 6. Key Hypotheses\n- Hypothesis 1: Teams spend 20% of their time on manual task updates.",
		);
	});

	it("should generate PRD markdown with partial data gracefully", async () => {
		(db.query.ProjectTable.findFirst as vi.Mock).mockResolvedValue({
			id: MOCK_PROJECT_ID,
			userId: MOCK_USER_ID,
			title: "Partial Data MVP",
			industry: "Education",
			status: "Draft",
			currentStage: 1,
			completionRate: 0,
			createdAt: "2025-01-01T00:00:00Z",
			updatedAt: "2025-01-01T00:00:00Z",
		});

		(db.query.StageResponseTable.findMany as vi.Mock).mockResolvedValue([
			// Only provide data for Stage 1 problem
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 1,
				questionId: "problem",
				answer: "Students forget deadlines.",
			},
		]);

		const markdown = await generatePrdMarkdown(MOCK_PROJECT_ID);

		expect(markdown).toContain(
			"# Partial Data MVP MVP Product Requirements Document",
		);
		expect(markdown).toContain("## 1. Executive Summary");
		expect(markdown).toContain(
			"- Problem Definition: Students forget deadlines.",
		);
		// Ensure sections with missing data are not included or are empty gracefully
		expect(markdown).not.toContain("- One-Sentence Summary:");
		expect(markdown).not.toContain("- Solution Overview:");
		expect(markdown).not.toContain("- Target Customer:");
		expect(markdown).not.toContain("## 6. Key Hypotheses"); // No hypotheses provided
	});

	it("should handle JSON parsing errors for answers gracefully", async () => {
		(db.query.ProjectTable.findFirst as vi.Mock).mockResolvedValue({
			id: MOCK_PROJECT_ID,
			userId: MOCK_USER_ID,
			title: "JSON Error MVP",
			industry: "Software",
			status: "InProgress",
			currentStage: 1,
			completionRate: 0,
			createdAt: "2025-01-01T00:00:00Z",
			updatedAt: "2025-01-01T00:00:00Z",
		});

		(db.query.StageResponseTable.findMany as vi.Mock).mockResolvedValue([
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 3,
				questionId: "mustHaveFeatures",
				answer: "{invalid json",
			}, // Invalid JSON
			{
				projectId: MOCK_PROJECT_ID,
				stageNumber: 1,
				questionId: "problem",
				answer: "Valid problem statement.",
			},
		]);

		const markdown = await generatePrdMarkdown(MOCK_PROJECT_ID);

		expect(markdown).toContain("## 1. Executive Summary");
		expect(markdown).toContain(
			"- Problem Definition: Valid problem statement.",
		);
		// The invalid JSON should be treated as a plain string or ignored, not crash
		expect(markdown).toContain("- Must-Have Features:\n  {invalid json");
	});
});
