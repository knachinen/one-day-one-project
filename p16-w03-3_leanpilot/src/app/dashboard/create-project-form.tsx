"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CreateProjectForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setLoading(true);

		const formData = new FormData(event.currentTarget);
		const title = formData.get("title");
		const industry = formData.get("industry");

		if (!title || !industry) {
			setError("Title and Industry are required.");
			setLoading(false);
			return;
		}

		try {
			const res = await fetch("/api/projects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, industry }),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || "Failed to create project.");
			}

			router.refresh(); // Refresh the page to show the new project
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Create New Project</CardTitle>
				<CardDescription>Start a new MVP planning journey.</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<label htmlFor="title">Project Title</label>
						<Input id="title" name="title" required disabled={loading} />
					</div>
					<div className="grid gap-2">
						<label htmlFor="industry">Industry</label>
						<Input id="industry" name="industry" required disabled={loading} />
					</div>
					{error && <p className="text-sm text-red-500">{error}</p>}
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Creating..." : "Create Project"}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
