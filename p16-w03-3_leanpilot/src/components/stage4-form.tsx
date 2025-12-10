"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "@/store/project-store";

// Define the Zod schema for Stage 4
const metricSchema = z.object({
	description: z.string().min(1, "Metric description is required."),
});

const stage4Schema = z.object({
	preMvpValidation: z
		.array(z.string())
		.min(1, "Select at least one pre-MVP validation method."),
	preMvpGoal: z.string().min(1, "Pre-MVP validation goal is required."),
	postMvpMetrics: z
		.array(metricSchema)
		.min(1, "Define at least one post-MVP metric."),
	measurementTools: z.string().optional(),
	successCriteria: z.string().min(1, "Success criteria is required."),
	pivotTriggers: z.string().min(1, "Pivot triggers is required."),
	feedbackMethods: z
		.array(z.string())
		.min(1, "Select at least one feedback method."),
});

type Stage4FormData = z.infer<typeof stage4Schema>;

interface Stage4FormProps {
	projectId: string;
}

const preMvpOptions = [
	"Landing page + waitlist",
	"Survey (min 50 people)",
	"Customer interviews (min 10 people)",
	"Figma/Mockup feedback",
	"Other",
];

const feedbackOptions = [
	"In-app survey",
	"Email survey",
	"1:1 user interviews",
	"Support chat",
	"NPS survey",
];

export default function Stage4Form({ projectId }: Stage4FormProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { getStageData, setStageData } = useProjectStore();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<Stage4FormData>({
		resolver: zodResolver(stage4Schema),
		defaultValues: {
			preMvpValidation: [],
			preMvpGoal: "",
			postMvpMetrics: [{ description: "" }],
			measurementTools: "",
			successCriteria: "",
			pivotTriggers: "",
			feedbackMethods: [],
		},
	});

	const {
		fields: postMvpMetricFields,
		append: appendPostMvpMetric,
		remove: removePostMvpMetric,
	} = useFieldArray({
		control,
		name: "postMvpMetrics",
	});

	useEffect(() => {
		async function fetchInitialData() {
			setLoading(true);
			try {
				const response = await fetch(`/api/projects/${projectId}/stages/4`);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to fetch stage 4 data.");
				}
				const data = await response.json();
				const formattedData: Partial<Stage4FormData> = {};
				for (const key in data) {
					if (data[key] && typeof data[key] === "string") {
						try {
							formattedData[key as keyof Stage4FormData] = JSON.parse(
								data[key],
							);
						} catch {
							formattedData[key as keyof Stage4FormData] = data[key];
						}
					}
				}
				reset(formattedData);
				setStageData(4, formattedData);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchInitialData();
	}, [projectId, reset, setStageData]);

	const onSubmit = async (data: Stage4FormData) => {
		setLoading(true);
		setError(null);
		try {
			setStageData(4, data);

			const response = await fetch(`/api/projects/${projectId}/stages/4`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.message || "Failed to save stage 4 data.");
			}

			router.push(`/projects/${projectId}/stage/5`);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <p>Loading Stage 4 form...</p>;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Section A: Pre-MVP Validation */}
			<div>
				<h3 className="text-xl font-semibold mb-2">1. Pre-MVP Validation</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: How will you validate before developing the MVP?
				</p>
				<div className="grid gap-2">
					{preMvpOptions.map((option, index) => (
						<div key={option} className="flex items-center space-x-2">
							<Checkbox
								id={`preMvpValidation.${index}`}
								value={option}
								{...register("preMvpValidation")}
								disabled={loading}
							/>
							<label
								htmlFor={`preMvpValidation.${index}`}
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{option}
							</label>
						</div>
					))}
					{errors.preMvpValidation && (
						<p className="text-sm text-red-500">
							{errors.preMvpValidation.message}
						</p>
					)}
				</div>
			</div>

			<div className="grid gap-2">
				<label htmlFor="preMvpGoal">2. Pre-MVP Validation Goal (Metrics)</label>
				<p className="text-sm text-muted-foreground">
					Guide: Define specific, measurable goals for your pre-MVP validation.
				</p>
				<Textarea
					id="preMvpGoal"
					{...register("preMvpGoal")}
					rows={3}
					placeholder="e.g., 'Over 20% of landing page visitors register their email', '7 out of 10 interviewees respond 'definitely would use'."
					disabled={loading}
				/>
				{errors.preMvpGoal && (
					<p className="text-sm text-red-500">{errors.preMvpGoal.message}</p>
				)}
			</div>

			{/* Section B: Post-MVP Validation */}
			<div>
				<h3 className="text-xl font-semibold mb-2">
					3. Post-MVP Metrics (up to 5)
				</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: What metrics will you measure after launching the MVP? (Refer
					to AAARRR framework)
				</p>
				{postMvpMetricFields.map((field, index) => (
					<div key={field.id} className="flex gap-4 mb-4">
						<div className="grid gap-2 flex-grow">
							<label htmlFor={`postMvpMetrics.${index}.description`}>
								Metric {index + 1}
							</label>
							<Input
								id={`postMvpMetrics.${index}.description`}
								{...register(`postMvpMetrics.${index}.description`)}
								disabled={loading}
							/>
							{errors.postMvpMetrics?.[index]?.description && (
								<p className="text-sm text-red-500">
									{errors.postMvpMetrics[index]?.description?.message}
								</p>
							)}
						</div>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => removePostMvpMetric(index)}
							disabled={loading}
							className="self-end"
						>
							<MinusCircle className="h-4 w-4" />
						</Button>
					</div>
				))}
				{errors.postMvpMetrics && (
					<p className="text-sm text-red-500">
						{errors.postMvpMetrics.message}
					</p>
				)}
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => appendPostMvpMetric({ description: "" })}
					disabled={loading || postMvpMetricFields.length >= 5}
				>
					<PlusCircle className="mr-2 h-4 w-4" /> Add Post-MVP Metric
				</Button>
			</div>

			<div className="grid gap-2">
				<label htmlFor="measurementTools">
					4. What tools will you use to measure?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: List tools like Google Analytics, Mixpanel, Hotjar.
				</p>
				<Input
					id="measurementTools"
					{...register("measurementTools")}
					placeholder="e.g., Google Analytics, Mixpanel, Hotjar"
					disabled={loading}
				/>
				{errors.measurementTools && (
					<p className="text-sm text-red-500">
						{errors.measurementTools.message}
					</p>
				)}
			</div>

			{/* Section C: Success/Failure Criteria */}
			<div className="grid gap-2">
				<label htmlFor="successCriteria">
					5. What results constitute success?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: Define clear, quantitative goals for success.
				</p>
				<Textarea
					id="successCriteria"
					{...register("successCriteria")}
					rows={3}
					placeholder="e.g., '10 paid customers, $100 MRR in the first month'."
					disabled={loading}
				/>
				{errors.successCriteria && (
					<p className="text-sm text-red-500">
						{errors.successCriteria.message}
					</p>
				)}
			</div>

			<div className="grid gap-2">
				<label htmlFor="pivotTriggers">
					6. What results would trigger a pivot?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: Identify critical failure points that would require a change in
					strategy.
				</p>
				<Textarea
					id="pivotTriggers"
					{...register("pivotTriggers")}
					rows={3}
					placeholder="e.g., 'Zero paid conversions for 3 months'."
					disabled={loading}
				/>
				{errors.pivotTriggers && (
					<p className="text-sm text-red-500">{errors.pivotTriggers.message}</p>
				)}
			</div>

			{/* Section D: Feedback Collection */}
			<div>
				<h3 className="text-xl font-semibold mb-2">
					7. How will you collect user feedback?
				</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: Select methods for gathering feedback from your users.
				</p>
				<div className="grid gap-2">
					{feedbackOptions.map((option, index) => (
						<div key={option} className="flex items-center space-x-2">
							<Checkbox
								id={`feedbackMethods.${index}`}
								value={option}
								{...register("feedbackMethods")}
								disabled={loading}
							/>
							<label
								htmlFor={`feedbackMethods.${index}`}
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{option}
							</label>
						</div>
					))}
					{errors.feedbackMethods && (
						<p className="text-sm text-red-500">
							{errors.feedbackMethods.message}
						</p>
					)}
				</div>
			</div>

			{error && <p className="text-sm text-red-500">{error}</p>}

			<Button type="submit" disabled={loading}>
				{loading ? "Saving..." : "Save & Next"}
			</Button>
		</form>
	);
}
