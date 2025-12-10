"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "@/store/project-store";

// Define the Zod schema for Stage 1
const stage1Schema = z.object({
	problem: z
		.string()
		.min(20, "Problem description must be at least 20 characters."),
	frequency: z.enum(["daily", "weekly", "monthly", "sometimes"]),
	cost: z.string().optional(),
	targetCustomer: z
		.string()
		.min(20, "Target customer description must be at least 20 characters."),
	marketSize: z.string().optional(),
	currentAlternatives: z.string().optional(),
	alternativesLimitations: z.string().optional(),
});

type Stage1FormData = z.infer<typeof stage1Schema>;

interface Stage1FormProps {
	projectId: string;
}

export default function Stage1Form({ projectId }: Stage1FormProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState<
		"idle" | "saving" | "saved" | "error"
	>("idle");

	const { setStageData } = useProjectStore();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty },
	} = useForm<Stage1FormData>({
		resolver: zodResolver(stage1Schema),
		defaultValues: {
			problem: "",
			frequency: "sometimes",
			cost: "",
			targetCustomer: "",
			marketSize: "",
			currentAlternatives: "",
			alternativesLimitations: "",
		},
	});

	const debouncedSave = useDebouncedCallback(async (data: Stage1FormData) => {
		setIsSaving(true);
		setSaveStatus("saving");
		try {
			setStageData(1, data);

			const response = await fetch(`/api/projects/${projectId}/stages/1`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.message || "Failed to save stage 1 data.");
			}
			setSaveStatus("saved");
		} catch (err: any) {
			setError(err.message);
			setSaveStatus("error");
		} finally {
			setIsSaving(false);
		}
	}, 5000); // Debounce for 3 seconds

	useEffect(() => {
		const subscription = watch((value) => {
			if (isDirty) {
				debouncedSave(value as Stage1FormData);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, isDirty, debouncedSave]);

	useEffect(() => {
		async function fetchInitialData() {
			setLoading(true);
			try {
				const response = await fetch(`/api/projects/${projectId}/stages/1`);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to fetch stage 1 data.");
				}
				const data = await response.json();
				const formattedData: Partial<Stage1FormData> = {};
				for (const key in data) {
					if (data[key] && typeof data[key] === "string") {
						try {
							formattedData[key as keyof Stage1FormData] = JSON.parse(
								data[key],
							);
						} catch {
							formattedData[key as keyof Stage1FormData] = data[key];
						}
					}
				}
				reset(formattedData);
				setStageData(1, formattedData); // Update Zustand store with fetched data
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchInitialData();
	}, [projectId, reset, setStageData]);

	const onNext = async (data: Stage1FormData) => {
		setLoading(true);
		setError(null);
		try {
			setStageData(1, data);

			const response = await fetch(`/api/projects/${projectId}/stages/1`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data), // Send form data directly
			});
			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.message || "Failed to save stage 1 data.");
			}

			router.push(`/projects/${projectId}/stage/2`); // Move to next stage
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <p>Loading Stage 1 form...</p>;
	}

	return (
		<form onSubmit={handleSubmit(onNext)} className="space-y-6">
			<div className="grid gap-2">
				<label htmlFor="problem">
					1. What problem are you trying to solve?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: Describe the specific pain points your customers experience.
				</p>
				<Textarea
					id="problem"
					{...register("problem")}
					rows={5}
					placeholder="e.g., Freelancers spend too much time creating project estimates from scratch."
					disabled={isSaving}
				/>
				{errors.problem && (
					<p className="text-sm text-red-500">{errors.problem.message}</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="frequency">2. How often does this problem occur?</label>
				<p className="text-sm text-muted-foreground">
					Guide: Select the frequency of the problem occurrence.
				</p>
				<select
					id="frequency"
					{...register("frequency")}
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isSaving}
				>
					<option value="daily">Daily</option>
					<option value="weekly">1-2 times a week</option>
					<option value="monthly">1-2 times a month</option>
					<option value="sometimes">Sometimes</option>
				</select>
				{errors.frequency && (
					<p className="text-sm text-red-500">{errors.frequency.message}</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="cost">
					3. What is the cost/loss due to this problem?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: Quantify the impact (time, money, opportunity cost).
				</p>
				<Input
					id="cost"
					{...register("cost")}
					placeholder="e.g., Time, money, opportunity cost"
					disabled={isSaving}
				/>
				{errors.cost && (
					<p className="text-sm text-red-500">{errors.cost.message}</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="targetCustomer">
					4. Who is experiencing this problem?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: Describe your persona (e.g., age, occupation, habits).
				</p>
				<Textarea
					id="targetCustomer"
					{...register("targetCustomer")}
					rows={3}
					placeholder="e.g., Freelance designers, 30s, taking 5-10 projects per month."
					disabled={isSaving}
				/>
				{errors.targetCustomer && (
					<p className="text-sm text-red-500">
						{errors.targetCustomer.message}
					</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="marketSize">
					5. Approximately how many target customers are there?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: Estimate the market size (e.g., in Korea or globally).
				</p>
				<Input
					id="marketSize"
					{...register("marketSize")}
					placeholder="e.g., Estimated number of customers in the Korean or global market."
					disabled={isSaving}
				/>
				{errors.marketSize && (
					<p className="text-sm text-red-500">{errors.marketSize.message}</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="currentAlternatives">
					6. How are people solving this problem now?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: List existing solutions, competitors, or manual workarounds.
				</p>
				<Textarea
					id="currentAlternatives"
					{...register("currentAlternatives")}
					rows={3}
					placeholder="e.g., Competitors, substitutes, manual work."
					disabled={isSaving}
				/>
				{errors.currentAlternatives && (
					<p className="text-sm text-red-500">
						{errors.currentAlternatives.message}
					</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="alternativesLimitations">
					7. What are the limitations of current solutions?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: Identify what makes existing solutions inconvenient, costly, or
					time-consuming.
				</p>
				<Textarea
					id="alternativesLimitations"
					{...register("alternativesLimitations")}
					rows={3}
					placeholder="e.g., Inconvenience, cost, time."
					disabled={isSaving}
				/>
				{errors.alternativesLimitations && (
					<p className="text-sm text-red-500">
						{errors.alternativesLimitations.message}
					</p>
				)}
			</div>

			{error && <p className="text-sm text-red-500">{error}</p>}
			{saveStatus === "saving" && (
				<p className="text-sm text-blue-500">Saving...</p>
			)}
			{saveStatus === "saved" && (
				<p className="text-sm text-green-500">Saved!</p>
			)}
			{saveStatus === "error" && (
				<p className="text-sm text-red-500">Auto-save error!</p>
			)}

			<Button type="submit" disabled={isSaving}>
				Next Stage
			</Button>
		</form>
	);
}
