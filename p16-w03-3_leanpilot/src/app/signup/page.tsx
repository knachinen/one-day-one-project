"use client";

import Link from "next/link";
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
import { signup } from "../actions";

export default function SignupPage() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		const formData = new FormData(event.currentTarget);
		const res = await signup(formData);

		if (res?.error) {
			setError(res.error);
		} else {
			router.push("/dashboard");
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<Card className="w-full max-w-sm">
				<form onSubmit={handleSubmit}>
					<CardHeader>
						<CardTitle>Sign Up</CardTitle>
						<CardDescription>Create an account to get started.</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid gap-2">
							<label htmlFor="name">Name</label>
							<Input id="name" name="name" required />
						</div>
						<div className="grid gap-2">
							<label htmlFor="email">Email</label>
							<Input id="email" name="email" type="email" required />
						</div>
						<div className="grid gap-2">
							<label htmlFor="password">Password</label>
							<Input id="password" name="password" type="password" required />
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
					</CardContent>
					<CardFooter className="flex flex-col gap-4">
						<Button className="w-full" type="submit">
							Sign Up
						</Button>
						<p className="text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link href="/login" className="text-primary hover:underline">
								Login
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</main>
	);
}
