import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProjectTable } from "@/lib/db/schema";
import { logout } from "../logout/actions";
import CreateProjectForm from "./create-project-form";

export default async function DashboardPage() {
	const { user } = await validateRequest();

	if (!user) {
		return redirect("/login");
	}

	const projects = await db.query.ProjectTable.findMany({
		where: eq(ProjectTable.userId, user.id),
	});

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="flex w-full max-w-4xl justify-between items-center mb-8">
				<h1 className="text-4xl font-bold">
					Welcome, {user.name || user.email}!
				</h1>
				<div className="flex gap-4">
					<Button asChild>
						<Link href="/">Home</Link>
					</Button>
					<form action={logout}>
						<Button type="submit" variant="destructive">
							Logout
						</Button>
					</form>
				</div>
			</div>

			<div className="w-full max-w-4xl mb-8">
				<h2 className="text-2xl font-bold mb-4">Your Projects</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{projects.length > 0 ? (
						projects.map((project) => (
							<Card key={project.id}>
								<CardHeader>
									<CardTitle>{project.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">
										Industry: {project.industry}
									</p>
									<p className="text-sm text-muted-foreground">
										Status: {project.status} (Stage {project.currentStage})
									</p>
									<Button asChild className="mt-4 w-full">
										<Link href={`/projects/${project.id}/preview`}>View Project</Link>
									</Button>
								</CardContent>
							</Card>
						))
					) : (
						<p className="col-span-full text-center text-muted-foreground">
							No projects yet. Create one to get started!
						</p>
					)}
				</div>
			</div>

			<div className="w-full max-w-4xl">
				<CreateProjectForm />
			</div>
		</main>
	);
}
