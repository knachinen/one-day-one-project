"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StageNavigationProps {
	projectId: string;
	currentStage: number;
}

const stages = [
	{ number: 1, title: "Problem Discovery" },
	{ number: 2, title: "Solution Definition" },
	{ number: 3, title: "MVP Scoping" },
	{ number: 4, title: "Validation Plan" },
	{ number: 5, title: "Execution Roadmap" },
];

export default function StageNavigation({
	projectId,
	currentStage,
}: StageNavigationProps) {
	const _pathname = usePathname();
	const [completion, setCompletion] = useState(0); // Assuming completion is 0-100

	useEffect(() => {
		// Calculate a simple completion percentage based on current stage
		// A more complex calculation would involve checking if all questions in a stage are answered
		setCompletion(Math.round((currentStage / stages.length) * 100));
	}, [currentStage]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Stages</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<p className="text-sm font-medium">Progress: {completion}%</p>
					<Progress value={completion} className="w-full" />
				</div>
				<nav className="space-y-2">
					{stages.map((stage) => (
						<Link
							key={stage.number}
							href={`/projects/${projectId}/stage/${stage.number}`}
							className={cn(
								"flex items-center p-2 rounded-md text-sm font-medium hover:bg-muted",
								{
									"bg-primary text-primary-foreground hover:bg-primary/90":
										stage.number === currentStage,
								},
							)}
						>
							<span className="mr-2">{stage.number}.</span> {stage.title}
						</Link>
					))}
				</nav>
			</CardContent>
		</Card>
	);
}
