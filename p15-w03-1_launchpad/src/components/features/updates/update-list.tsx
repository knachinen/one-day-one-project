import { getUpdatesForIdea, UpdateWithAuthor } from '@/features/ideas/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UpdateListProps {
    ideaId: string;
}

export async function UpdateList({ ideaId }: UpdateListProps) {
    const updates: UpdateWithAuthor[] = await getUpdatesForIdea(ideaId);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold">Updates ({updates.length})</h3>
            {updates.length === 0 ? (
                <p className="text-muted-foreground">No updates yet.</p>
            ) : (
                updates.map((update) => (
                    <Card key={update.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg">{update.title}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={update.authorAvatarUrl || ''} />
                                    <AvatarFallback>{update.author ? update.author[0].toUpperCase() : 'U'}</AvatarFallback>
                                </Avatar>
                                <span>{update.author}</span>
                                <span>•</span>
                                <span>{new Date(update.createdAt).toLocaleDateString()}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-wrap">{update.content}</p>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
