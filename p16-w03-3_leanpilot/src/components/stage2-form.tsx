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

// Define the Zod schema for Stage 2
const stage2Schema = z.object({
	solutionOverview: z
		.string()
		.min(50, "Solution overview must be at least 50 characters."),
	usp: z.string().min(30, "USP must be at least 30 characters."),
	tagline: z.string().min(10, "Tagline must be at least 10 characters."),
	valueProposition: z
		.string()
		.min(30, "Value proposition must be at least 30 characters."),
	paymentValue: z.enum(["free", "premium", "professional", "enterprise"]),
	hypothesis1: z
		.string()
		.min(30, "Hypothesis 1 must be at least 30 characters."),
	hypothesis2: z
		.string()
		.min(30, "Hypothesis 2 must be at least 30 characters."),
	hypothesis3: z
		.string()
		.min(30, "Hypothesis 3 must be at least 30 characters."),
});

type Stage2FormData = z.infer<typeof stage2Schema>;

interface Stage2FormProps {
	projectId: string;
}

export default function Stage2Form({ projectId }: Stage2FormProps) {
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
	} = useForm<Stage2FormData>({
		resolver: zodResolver(stage2Schema),
		defaultValues: {
			solutionOverview: "",
			usp: "",
			tagline: "",
			valueProposition: "",
			paymentValue: "free",
			hypothesis1: "",
			hypothesis2: "",
			hypothesis3: "",
		},
	});

	const debouncedSave = useDebouncedCallback(async (data: Stage2FormData) => {
		setIsSaving(true);
		setSaveStatus("saving");
		try {
			setStageData(2, data);

			const response = await fetch(`/api/projects/${projectId}/stages/2`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.message || "Failed to save stage 2 data.");
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
				debouncedSave(value as Stage2FormData);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, isDirty, debouncedSave]);

	useEffect(() => {
		async function fetchInitialData() {
			setLoading(true);
			try {
				const response = await fetch(`/api/projects/${projectId}/stages/2`);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to fetch stage 2 data.");
				}
				const data = await response.json();
				const formattedData: Partial<Stage2FormData> = {};
				for (const key in data) {
					if (data[key] && typeof data[key] === "string") {
						try {
							formattedData[key as keyof Stage2FormData] = JSON.parse(
								data[key],
							);
						} catch {
							formattedData[key as keyof Stage2FormData] = data[key];
						}
					}
				}
				reset(formattedData);
				setStageData(2, formattedData);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchInitialData();
	}, [projectId, reset, setStageData]);

	const onNext = async (data: Stage2FormData) => {
		setLoading(true);
		setError(null);
		try {
			setStageData(2, data);

			const response = await fetch(`/api/projects/${projectId}/stages/2`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.message || "Failed to save stage 2 data.");
			}

			router.push(`/projects/${projectId}/stage/3`);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <p>Loading Stage 2 form...</p>;
	}

	return (
		<form onSubmit={handleSubmit(onNext)} className="space-y-6">
			<div className="grid gap-2">
				<label htmlFor="solutionOverview">
					1. How do you solve the problem?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: Describe the core features or approach of your solution.
				</p>
				<Textarea
					id="solutionOverview"
					{...register("solutionOverview")}
					rows={5}
					placeholder="e.g., Provide a template library + auto-calculator to complete estimates in 5 minutes."
					disabled={isSaving}
				/>
				{errors.solutionOverview && (
					<p className="text-sm text-red-500">
						{errors.solutionOverview.message}
					</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="usp">2. What makes your solution different?</label>
				<p className="text-sm text-muted-foreground">
					Guide: Explain why customers should choose your product over
					alternatives.
				</p>
				<Textarea
					id="usp"
					{...register("usp")}
					rows={3}
					placeholder="e.g., Why should customers choose your product?"
					disabled={isSaving}
				/>
				{errors.usp && (
					<p className="text-sm text-red-500">{errors.usp.message}</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="tagline">3. Summarize in one sentence (Tagline):</label>
				<p className="text-sm text-muted-foreground">
					Guide: A concise and catchy summary of your product.
				</p>
				<Input
					id="tagline"
					{...register("tagline")}
					placeholder="e.g., The 5-minute estimate maker for freelancers."
					disabled={isSaving}
				/>
				{errors.tagline && (
					<p className="text-sm text-red-500">{errors.tagline.message}</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="valueProposition">
					4. What is the biggest benefit customers get?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: Focus on key benefits like time savings, cost reduction, or
					quality improvement.
				</p>
				<Textarea
					id="valueProposition"
					{...register("valueProposition")}
					rows={3}
					placeholder="e.g., Time savings, cost reduction, quality improvement."
					disabled={isSaving}
				/>
				{errors.valueProposition && (
					<p className="text-sm text-red-500">
						{errors.valueProposition.message}
					</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="paymentValue">5. Is it worth paying for?</label>
				<p className="text-sm text-muted-foreground">
					Guide: Select your pricing model.
				</p>
				<select
					id="paymentValue"
					{...register("paymentValue")}
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isSaving}
				>
					<option value="free">Free</option>
					<option value="premium">Premium ($1-10/month)</option>
					<option value="professional">Professional ($10-50/month)</option>
					<option value="enterprise">Enterprise</option>
				</select>
				{errors.paymentValue && (
					<p className="text-sm text-red-500">{errors.paymentValue.message}</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="hypothesis1">6. Key Hypothesis 1:</label>
				<p className="text-sm text-muted-foreground">
					Guide: Formulate a measurable assumption to validate.
				</p>
				<Textarea
					id="hypothesis1"
					{...register("hypothesis1")}
					rows={2}
					placeholder="e.g., Freelancers spend an average of 30 minutes or more creating estimates."
					disabled={isSaving}
				/>
				{errors.hypothesis1 && (
					<p className="text-sm text-red-500">{errors.hypothesis1.message}</p>
				)}
			</div>
			<div className="grid gap-2">
				<label htmlFor="hypothesis2">7. Key Hypothesis 2:</label>
				<p className="text-sm text-muted-foreground">
					Guide: Formulate a measurable assumption to validate.
				</p>
				<Textarea
					id="hypothesis2"
					{...register("hypothesis2")}
					rows={2}
					placeholder="e.g., With templates, estimate creation time can be reduced to 5 minutes."
					disabled={isSaving}
				/>
				{errors.hypothesis2 && (
					<p className="text-sm text-red-500">{errors.hypothesis2.message}</p>
				)}
			</div>
			<div className="grid gap-2">
				<label htmlFor="hypothesis3">8. Key Hypothesis 3:</label>
				<p className="text-sm text-muted-foreground">
					Guide: Formulate a measurable assumption to validate.
				</p>
				<Textarea
					id="hypothesis3"
					{...register("hypothesis3")}
					rows={2}
					placeholder="e.g., Freelancers are willing to pay $10/month for this."
					disabled={isSaving}
				/>
				{errors.hypothesis3 && (
					<p className="text-sm text-red-500">{errors.hypothesis3.message}</p>
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
