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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "@/store/project-store";

// Define the Zod schema for Stage 5
const milestoneSchema = z.object({
	description: z.string().min(1, "Milestone description is required."),
	duration: z.string().min(1, "Duration is required."), // e.g., 'Week 1-2', 'Month 1'
});

const stage5Schema = z.object({
	devPeriod: z.enum(["2weeks", "1month", "2-3months", "3months+"]),
	devMethod: z.string().min(1, "Development method is required."),
	techStack: z.string().optional(),
	milestones: z
		.array(milestoneSchema)
		.min(1, "At least one milestone is required."),
	launchChannels: z
		.array(z.string())
		.min(1, "Select at least one launch channel."),
	marketingChannels: z.string().min(1, "Marketing channels are required."),
	estimatedCost: z.string().min(1, "Estimated cost is required."),
	teamStatus: z.string().min(1, "Team status is required."),
});

type Stage5FormData = z.infer<typeof stage5Schema>;

interface Stage5FormProps {
	projectId: string;
}

const launchChannelOptions = [
	"Private Beta (friends/acquaintances)",
	"Product Hunt",
	"Specific communities (Reddit, Discord)",
	"SNS (Twitter, LinkedIn)",
];

export default function Stage5Form({ projectId }: Stage5FormProps) {
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
	} = useForm<Stage5FormData>({
		resolver: zodResolver(stage5Schema),
		defaultValues: {
			devPeriod: "1month",
			devMethod: "",
			techStack: "",
			milestones: [{ description: "", duration: "" }],
			launchChannels: [],
			marketingChannels: "",
			estimatedCost: "",
			teamStatus: "",
		},
	});

	const {
		fields: milestoneFields,
		append: appendMilestone,
		remove: removeMilestone,
	} = useFieldArray({
		control,
		name: "milestones",
	});

	useEffect(() => {
		async function fetchInitialData() {
			setLoading(true);
			try {
				const response = await fetch(`/api/projects/${projectId}/stages/5`);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to fetch stage 5 data.");
				}
				const data = await response.json();
				const formattedData: Partial<Stage5FormData> = {};
				for (const key in data) {
					if (data[key] && typeof data[key] === "string") {
						try {
							formattedData[key as keyof Stage5FormData] = JSON.parse(
								data[key],
							);
						} catch {
							formattedData[key as keyof Stage5FormData] = data[key];
						}
					}
				}
				reset(formattedData);
				setStageData(5, formattedData);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchInitialData();
	}, [projectId, reset, setStageData]);

	const onSubmit = async (data: Stage5FormData) => {
		setLoading(true);
		setError(null);
		try {
			setStageData(5, data);

			const response = await fetch(`/api/projects/${projectId}/stages/5`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.message || "Failed to save stage 5 data.");
			}

			router.push(`/dashboard`); // Redirect to dashboard or a summary page
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <p>Loading Stage 5 form...</p>;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Development Plan */}
			<div>
				<h3 className="text-xl font-semibold mb-2">1. Development Plan</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: Outline the key aspects of your development strategy.
				</p>
				<div className="grid gap-2 mb-4">
					<label htmlFor="devPeriod">1.1. Estimated Development Period?</label>
					<Select
						onValueChange={(value) =>
							reset({
								...watch(),
								devPeriod: value as
									| "2weeks"
									| "1month"
									| "2-3months"
									| "3months+",
							})
						}
						defaultValue={watch("devPeriod")}
						disabled={loading}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select Period" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="2weeks">Under 2 weeks</SelectItem>
							<SelectItem value="1month">1 month</SelectItem>
							<SelectItem value="2-3months">2-3 months</SelectItem>
							<SelectItem value="3months+">Over 3 months</SelectItem>
						</SelectContent>
					</Select>
					{errors.devPeriod && (
						<p className="text-sm text-red-500">{errors.devPeriod.message}</p>
					)}
				</div>

				<div className="grid gap-2 mb-4">
					<label htmlFor="devMethod">
						1.2. Self-development or Outsourcing?
					</label>
					<Input
						id="devMethod"
						{...register("devMethod")}
						placeholder="e.g., Self-development (Tech Stack: ...), Outsourcing (Budget: ...), No-code tool (Bubble, Webflow), AI tool (v0, Cursor)"
						disabled={loading}
					/>
					{errors.devMethod && (
						<p className="text-sm text-red-500">{errors.devMethod.message}</p>
					)}
				</div>

				<div className="grid gap-2">
					<label htmlFor="techStack">1.3. Technology Stack (Optional)</label>
					<Input
						id="techStack"
						{...register("techStack")}
						placeholder="e.g., Frontend, Backend, Database"
						disabled={loading}
					/>
					{errors.techStack && (
						<p className="text-sm text-red-500">{errors.techStack.message}</p>
					)}
				</div>
			</div>

			{/* Milestones */}
			<div>
				<h3 className="text-xl font-semibold mb-2">
					2. Key Milestones (up to 5)
				</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: Break down your development into key milestones with estimated
					durations.
				</p>
				{milestoneFields.map((field, index) => (
					<div
						key={field.id}
						className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-md"
					>
						<div className="grid gap-2">
							<label htmlFor={`milestones.${index}.description`}>
								Milestone Description
							</label>
							<Input
								id={`milestones.${index}.description`}
								{...register(`milestones.${index}.description`)}
								disabled={loading}
							/>
							{errors.milestones?.[index]?.description && (
								<p className="text-sm text-red-500">
									{errors.milestones[index]?.description?.message}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<label htmlFor={`milestones.${index}.duration`}>Duration</label>
							<Input
								id={`milestones.${index}.duration`}
								{...register(`milestones.${index}.duration`)}
								placeholder="e.g., Week 1-2, Month 1"
								disabled={loading}
							/>
							{errors.milestones?.[index]?.duration && (
								<p className="text-sm text-red-500">
									{errors.milestones[index]?.duration?.message}
								</p>
							)}
						</div>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => removeMilestone(index)}
							disabled={loading}
							className="mt-2"
						>
							<MinusCircle className="mr-2 h-4 w-4" /> Remove
						</Button>
					</div>
				))}
				{errors.milestones && (
					<p className="text-sm text-red-500">{errors.milestones.message}</p>
				)}
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => appendMilestone({ description: "", duration: "" })}
					disabled={loading || milestoneFields.length >= 5}
				>
					<PlusCircle className="mr-2 h-4 w-4" /> Add Milestone
				</Button>
			</div>

			{/* Launch Strategy */}
			<div>
				<h3 className="text-xl font-semibold mb-2">3. Launch Strategy</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: Plan where and how you will launch your MVP to acquire initial
					users.
				</p>
				<div className="grid gap-2">
					{launchChannelOptions.map((option, index) => (
						<div key={option} className="flex items-center space-x-2">
							<Checkbox
								id={`launchChannels.${index}`}
								value={option}
								{...register("launchChannels")}
								disabled={loading}
							/>
							<label
								htmlFor={`launchChannels.${index}`}
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{option}
							</label>
						</div>
					))}
					{errors.launchChannels && (
						<p className="text-sm text-red-500">
							{errors.launchChannels.message}
						</p>
					)}
				</div>

				<div className="grid gap-2 mt-4">
					<label htmlFor="marketingChannels">
						4. How will you acquire initial users?
					</label>
					<Textarea
						id="marketingChannels"
						{...register("marketingChannels")}
						rows={3}
						placeholder="e.g., Specific marketing channels"
						disabled={loading}
					/>
					{errors.marketingChannels && (
						<p className="text-sm text-red-500">
							{errors.marketingChannels.message}
						</p>
					)}
				</div>
			</div>

			{/* Budget & Resources */}
			<div>
				<h3 className="text-xl font-semibold mb-2">5. Budget & Resources</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: Outline your estimated costs and team structure.
				</p>
				<div className="grid gap-2 mb-4">
					<label htmlFor="estimatedCost">5.1. Estimated Cost?</label>
					<Input
						id="estimatedCost"
						{...register("estimatedCost")}
						placeholder="e.g., Development costs, infrastructure costs (hosting, DB), marketing costs"
						disabled={loading}
					/>
					{errors.estimatedCost && (
						<p className="text-sm text-red-500">
							{errors.estimatedCost.message}
						</p>
					)}
				</div>

				<div className="grid gap-2">
					<label htmlFor="teamStatus">5.2. Solo or Team?</label>
					<Input
						id="teamStatus"
						{...register("teamStatus")}
						placeholder="e.g., Solo, Team (Roles: ...)"
						disabled={loading}
					/>
					{errors.teamStatus && (
						<p className="text-sm text-red-500">{errors.teamStatus.message}</p>
					)}
				</div>
			</div>

			{error && <p className="text-sm text-red-500">{error}</p>}

			<Button type="submit" disabled={loading}>
				{loading ? "Saving..." : "Save & Finish"}
			</Button>
		</form>
	);
}
