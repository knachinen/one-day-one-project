"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

// Define the Zod schema for Stage 3
const featureSchema = z.object({
	name: z.string().min(1, "Feature name is required."),
	priority: z.enum(["High", "Medium", "Low"]),
	purpose: z.string().min(1, "Purpose is required."),
});

const userFlowStepSchema = z.object({
	description: z.string().min(1, "Step description is required."),
});

const stage3Schema = z.object({
	mustHaveFeatures: z
		.array(featureSchema)
		.min(1, "At least one Must-Have feature is required."),
	niceToHaveFeatures: z.array(featureSchema).optional(),
	userFlow: z
		.array(userFlowStepSchema)
		.min(1, "At least one user flow step is required."),
	excludedItems: z.string().optional(),
});

type Stage3FormData = z.infer<typeof stage3Schema>;

interface Stage3FormProps {
	projectId: string;
}

export default function Stage3Form({ projectId }: Stage3FormProps) {
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
		control,
		watch,
		formState: { errors, isDirty },
	} = useForm<Stage3FormData>({
		resolver: zodResolver(stage3Schema),
		defaultValues: {
			mustHaveFeatures: [{ name: "", priority: "High", purpose: "" }],
			niceToHaveFeatures: [],
			userFlow: [{ description: "" }],
			excludedItems: "",
		},
	});

	const {
		fields: mustHaveFields,
		append: appendMustHave,
		remove: removeMustHave,
	} = useFieldArray({
		control,
		name: "mustHaveFeatures",
	});

	const {
		fields: niceToHaveFields,
		append: appendNiceToHave,
		remove: removeNiceToHave,
	} = useFieldArray({
		control,
		name: "niceToHaveFeatures",
	});

	const {
		fields: userFlowFields,
		append: appendUserFlow,
		remove: removeUserFlow,
	} = useFieldArray({
		control,
		name: "userFlow",
	});

	const debouncedSave = useDebouncedCallback(async (data: Stage3FormData) => {
		setIsSaving(true);
		setSaveStatus("saving");
		try {
			setStageData(3, data);

			const response = await fetch(`/api/projects/${projectId}/stages/3`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.message || "Failed to save stage 3 data.");
			}
			setSaveStatus("saved");
		} catch (err: any) {
			setError(err.message);
			setSaveStatus("error");
		} finally {
			setIsSaving(false);
		}
	}, 5000);

	useEffect(() => {
		const subscription = watch((value) => {
			if (isDirty) {
				debouncedSave(value as Stage3FormData);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, isDirty, debouncedSave]);

	useEffect(() => {
		async function fetchInitialData() {
			setLoading(true);
			try {
				const response = await fetch(`/api/projects/${projectId}/stages/3`);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to fetch stage 3 data.");
				}
				const data = await response.json();
				const formattedData: Partial<Stage3FormData> = {};
				for (const key in data) {
					if (data[key] && typeof data[key] === "string") {
						try {
							formattedData[key as keyof Stage3FormData] = JSON.parse(
								data[key],
							);
						} catch {
							formattedData[key as keyof Stage3FormData] = data[key];
						}
					}
				}
				reset(formattedData);
				setStageData(3, formattedData);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchInitialData();
	}, [projectId, reset, setStageData]);

	const onNext = async (data: Stage3FormData) => {
		setLoading(true);
		setError(null);
		try {
			setStageData(3, data);

			const response = await fetch(`/api/projects/${projectId}/stages/3`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				const errData = await response.json();
				throw new Error(errData.message || "Failed to save stage 3 data.");
			}

			router.push(`/projects/${projectId}/stage/4`);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <p>Loading Stage 3 form...</p>;
	}

	return (
		<form onSubmit={handleSubmit(onNext)} className="space-y-6">
			{/* Must-Have Features */}
			<div>
				<h3 className="text-xl font-semibold mb-2">
					1. Must-Have Features (up to 5)
				</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: These features are absolutely essential for your MVP to
					function.
				</p>
				{mustHaveFields.map((field, index) => (
					<div
						key={field.id}
						className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-md"
					>
						<div className="grid gap-2">
							<label htmlFor={`mustHaveFeatures.${index}.name`}>
								Feature Name
							</label>
							<Input
								id={`mustHaveFeatures.${index}.name`}
								{...register(`mustHaveFeatures.${index}.name`)}
								disabled={isSaving}
							/>
							{errors.mustHaveFeatures?.[index]?.name && (
								<p className="text-sm text-red-500">
									{errors.mustHaveFeatures[index]?.name?.message}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<label htmlFor={`mustHaveFeatures.${index}.priority`}>
								Priority
							</label>
							<Select
								onValueChange={(value) => {
									if (value) {
										// Manually set value for Select component
										// This is a common workaround for react-hook-form + shadcn Select
										(control._fields.mustHaveFeatures as any)[
											index
										].priority._f.value = value;
									}
								}}
								defaultValue={field.priority}
								disabled={isSaving}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select Priority" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="High">High</SelectItem>
									<SelectItem value="Medium">Medium</SelectItem>
									<SelectItem value="Low">Low</SelectItem>
								</SelectContent>
							</Select>
							{errors.mustHaveFeatures?.[index]?.priority && (
								<p className="text-sm text-red-500">
									{errors.mustHaveFeatures[index]?.priority?.message}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<label htmlFor={`mustHaveFeatures.${index}.purpose`}>
								Purpose
							</label>
							<Textarea
								id={`mustHaveFeatures.${index}.purpose`}
								{...register(`mustHaveFeatures.${index}.purpose`)}
								disabled={isSaving}
							/>
							{errors.mustHaveFeatures?.[index]?.purpose && (
								<p className="text-sm text-red-500">
									{errors.mustHaveFeatures[index]?.purpose?.message}
								</p>
							)}
						</div>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => removeMustHave(index)}
							disabled={isSaving}
							className="mt-2"
						>
							<MinusCircle className="mr-2 h-4 w-4" /> Remove
						</Button>
					</div>
				))}
				{errors.mustHaveFeatures && (
					<p className="text-sm text-red-500">
						{errors.mustHaveFeatures.message}
					</p>
				)}
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() =>
						appendMustHave({ name: "", priority: "High", purpose: "" })
					}
					disabled={isSaving || mustHaveFields.length >= 5}
				>
					<PlusCircle className="mr-2 h-4 w-4" /> Add Must-Have Feature
				</Button>
			</div>

			{/* Nice-to-Have Features */}
			<div>
				<h3 className="text-xl font-semibold mb-2">
					2. Nice-to-Have Features (for v2/v3)
				</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: Features that would be good to have but are not critical for
					the MVP's core functionality.
				</p>
				{niceToHaveFields.map((field, index) => (
					<div
						key={field.id}
						className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-md"
					>
						<div className="grid gap-2">
							<label htmlFor={`niceToHaveFeatures.${index}.name`}>
								Feature Name
							</label>
							<Input
								id={`niceToHaveFeatures.${index}.name`}
								{...register(`niceToHaveFeatures.${index}.name`)}
								disabled={isSaving}
							/>
							{errors.niceToHaveFeatures?.[index]?.name && (
								<p className="text-sm text-red-500">
									{errors.niceToHaveFeatures[index]?.name?.message}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<label htmlFor={`niceToHaveFeatures.${index}.priority`}>
								Priority
							</label>
							<Select
								onValueChange={(value) => {
									if (value) {
										(control._fields.niceToHaveFeatures as any)[
											index
										].priority._f.value = value;
									}
								}}
								defaultValue={field.priority}
								disabled={isSaving}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select Priority" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="High">High</SelectItem>
									<SelectItem value="Medium">Medium</SelectItem>
									<SelectItem value="Low">Low</SelectItem>
								</SelectContent>
							</Select>
							{errors.niceToHaveFeatures?.[index]?.priority && (
								<p className="text-sm text-red-500">
									{errors.niceToHaveFeatures[index]?.priority?.message}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<label htmlFor={`niceToHaveFeatures.${index}.purpose`}>
								Purpose
							</label>
							<Textarea
								id={`niceToHaveFeatures.${index}.purpose`}
								{...register(`niceToHaveFeatures.${index}.purpose`)}
								disabled={isSaving}
							/>
							{errors.niceToHaveFeatures?.[index]?.purpose && (
								<p className="text-sm text-red-500">
									{errors.niceToHaveFeatures[index]?.purpose?.message}
								</p>
							)}
						</div>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => removeNiceToHave(index)}
							disabled={isSaving}
							className="mt-2"
						>
							<MinusCircle className="mr-2 h-4 w-4" /> Remove
						</Button>
					</div>
				))}
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() =>
						appendNiceToHave({ name: "", priority: "Low", purpose: "" })
					}
					disabled={isSaving}
				>
					<PlusCircle className="mr-2 h-4 w-4" /> Add Nice-to-Have Feature
				</Button>
			</div>

			{/* User Flow */}
			<div>
				<h3 className="text-xl font-semibold mb-2">
					3. User Flow (Step-by-step)
				</h3>
				<p className="text-sm text-muted-foreground mb-4">
					Guide: Detail the step-by-step process of how a user will interact
					with your product.
				</p>
				{userFlowFields.map((field, index) => (
					<div key={field.id} className="flex gap-4 mb-4">
						<div className="grid gap-2 flex-grow">
							<label htmlFor={`userFlow.${index}.description`}>
								Step {index + 1}
							</label>
							<Input
								id={`userFlow.${index}.description`}
								{...register(`userFlow.${index}.description`)}
								disabled={isSaving}
							/>
							{errors.userFlow?.[index]?.description && (
								<p className="text-sm text-red-500">
									{errors.userFlow[index]?.description?.message}
								</p>
							)}
						</div>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => removeUserFlow(index)}
							disabled={isSaving}
							className="self-end"
						>
							<MinusCircle className="h-4 w-4" />
						</Button>
					</div>
				))}
				{errors.userFlow && (
					<p className="text-sm text-red-500">{errors.userFlow.message}</p>
				)}
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => appendUserFlow({ description: "" })}
					disabled={isSaving}
				>
					<PlusCircle className="mr-2 h-4 w-4" /> Add User Flow Step
				</Button>
			</div>

			{/* Excluded Items */}
			<div className="grid gap-2">
				<label htmlFor="excludedItems">
					4. What will be intentionally excluded from MVP?
				</label>
				<p className="text-sm text-muted-foreground">
					Guide: List features that will not be included in the MVP to reduce
					complexity and speed up launch.
				</p>
				<Textarea
					id="excludedItems"
					{...register("excludedItems")}
					rows={3}
					placeholder="e.g., AI auto-estimation, multi-language support (reasons: complexity, can be added later)."
					disabled={isSaving}
				/>
				{errors.excludedItems && (
					<p className="text-sm text-red-500">{errors.excludedItems.message}</p>
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
