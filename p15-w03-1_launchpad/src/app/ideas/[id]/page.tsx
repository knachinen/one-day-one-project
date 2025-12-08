import { db } from "@/lib/db";
import { ideas, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Need badge

type Params = Promise<{ id: string }>

export default async function IdeaDetailPage({ params }: { params: Params }) {
    const { id } = await params;

    const idea = await db.select({
        ...ideas,
        author: users.username,
    })
        .from(ideas)
        .leftJoin(users, eq(ideas.userId, users.id))
        .where(eq(ideas.id, id))
        .get();

    if (!idea) {
        notFound();
    }

    return (
        <div className="container py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">{idea.ideas.title}</h1>
                        <p className="text-xl text-muted-foreground">{idea.ideas.tagline}</p>
                        <div className="flex items-center gap-2">
                            <Badge>{idea.ideas.status}</Badge>
                            <Badge variant="outline">{idea.ideas.category}</Badge>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>About this idea</CardTitle>
                        </CardHeader>
                        <CardContent className="whitespace-pre-wrap">
                            {idea.ideas.description}
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Maker</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium">{idea.author || "Unknown"}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
