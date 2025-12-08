'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toggleVote, IdeaWithAuthor } from '@/features/ideas/actions'; // Import IdeaWithAuthor
import { useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';

export function IdeaCard({ idea }: { idea: IdeaWithAuthor }) {
    const [optimisticUpvotes, addOptimisticUpvote] = useOptimistic(
        (idea.upvotes ?? 0) as number,
        (currentUpvotes: number, amount: number) => currentUpvotes + amount
    );

    function SubmitButton() { // Moved inside IdeaCard
        const { pending } = useFormStatus();
        return (
            <Button variant="ghost" size="sm" className="h-auto px-2 py-1" type="submit" disabled={pending}>
                <span role="img" aria-label="upvote">🔥</span>
            </Button>
        );
    }

    return (
        <Card className="h-full flex flex-col hover:shadow-md transition-all">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <h3 className="font-semibold leading-none tracking-tight">
                            <Link href={`/ideas/${idea.id}`} className="hover:underline">
                                {idea.title}
                            </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {idea.tagline}
                        </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                        {idea.category}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                {/* Could add description snippet or tags here */}
            </CardContent>
            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground border-t pt-3">
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarFallback>{idea.author ? idea.author[0].toUpperCase() : 'U'}</AvatarFallback>
                    </Avatar>
                    <span>{idea.author}</span>
                </div>
                <div className="flex items-center gap-4">
                    <form action={async (formData) => {
                        addOptimisticUpvote(1); // Optimistically increment
                        await toggleVote(formData);
                    }}>
                        <input type="hidden" name="ideaId" value={idea.id} />
                        <SubmitButton /> {optimisticUpvotes}
                    </form>
                    {/* Comments count future placeholder */}
                </div>
            </CardFooter>
        </Card>
    );
}
