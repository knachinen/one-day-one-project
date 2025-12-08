import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface IdeaProps {
    id: string;
    title: string;
    tagline: string;
    category: string;
    status: string;
    upvotes: number | null;
    commentsCount?: number;
    author: string | null;
}

export function IdeaCard({ idea }: { idea: IdeaProps }) {
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
                    <div className="flex items-center gap-1">
                        <span>🔥 {idea.upvotes || 0}</span>
                    </div>
                    {/* Comments count future placeholder */}
                </div>
            </CardFooter>
        </Card>
    );
}
