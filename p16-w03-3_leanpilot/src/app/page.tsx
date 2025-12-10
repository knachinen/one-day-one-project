import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24">
			<h1 className="text-3xl sm:text-4xl font-bold text-center">LeanPilot</h1>
			<p className="mt-4 text-base sm:text-lg text-muted-foreground text-center max-w-prose">
				Plan your MVP with Lean Startup methodology.
			</p>
			<div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
				<Button asChild className="w-full sm:w-auto">
					<Link href="/signup">Get Started</Link>
				</Button>
				<Button variant="secondary" asChild className="w-full sm:w-auto">
					<Link href="/login">Login</Link>
				</Button>
			</div>
		</main>
	);
}
