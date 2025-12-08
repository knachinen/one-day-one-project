import { db } from "@/lib/db";
import { ideas, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommentList } from '@/components/features/comments/comment-list';
import { CommentForm } from '@/components/features/comments/comment-form';
import { UpdateForm } from '@/components/features/updates/update-form';
import { UpdateList } from '@/components/features/updates/update-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Import Tabs components

type Params = Promise<{ id: string }>

export default async function IdeaDetailPage({ params }: { params: Params }) {
    const { id } = await params;

    const idea = await db.select({
        id: ideas.id,
        userId: ideas.userId,
        title: ideas.title,
        tagline: ideas.tagline,
        description: ideas.description,
        category: ideas.category,
        status: ideas.status,
        upvotes: ideas.upvotes,
        createdAt: ideas.createdAt,
        updatedAt: ideas.updatedAt,
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
                        <h1 className="text-4xl font-bold">{idea.title}</h1>
                        <p className="text-xl text-muted-foreground">{idea.tagline}</p>
                        <div className="flex items-center gap-2">
                            <Badge>{idea.status}</Badge>
                            <Badge variant="outline">{idea.category}</Badge>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>About this idea</CardTitle>
                        </CardHeader>
                        <CardContent className="whitespace-pre-wrap">
                            {idea.description}
                        </CardContent>
                    </Card>

                    {/* Tabs for Comments and Updates */}
                    <Tabs defaultValue="comments" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="comments">Comments</TabsTrigger>
                            <TabsTrigger value="updates">Updates</TabsTrigger>
                        </TabsList>
                        <TabsContent value="comments" className="space-y-6 pt-4">
                            <CommentList ideaId={idea.id} />
                            <CommentForm ideaId={idea.id} />
                        </TabsContent>
                        <TabsContent value="updates" className="space-y-6 pt-4">
                            <UpdateList ideaId={idea.id} />
                            <UpdateForm ideaId={idea.id} />
                        </TabsContent>
                    </Tabs>
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
