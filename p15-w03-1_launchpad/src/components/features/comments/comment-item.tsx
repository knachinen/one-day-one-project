import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommentForm } from './comment-form';
import { CommentWithAuthor } from '@/features/ideas/actions'; // Import CommentWithAuthor

interface CommentItemProps {
    comment: CommentWithAuthor & { replies: (CommentWithAuthor & { replies: any[] })[] };
    replies: (CommentWithAuthor & { replies: any[] })[];
}

export function CommentItem({ comment, replies }: CommentItemProps) {
    return (
        <div className="flex items-start gap-4">
            <Avatar className="h-8 w-8">
                <AvatarImage src={(comment.authorAvatarUrl || '') as string} />
                <AvatarFallback>{comment.author ? (comment.author as string)[0].toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{comment.author as string}</span>
                    <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt as Date).toLocaleDateString()}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content as string}</p>

                {/* Reply Form (optional, could be a button to toggle form) */}
                <div className="mt-2 pl-8">
                    {/* For now, a simple reply form, later this could be toggled */}
                    <CommentForm ideaId={comment.ideaId as string} parentId={comment.id as string} />
                </div>

                {replies.length > 0 && (
                    <div className="ml-8 mt-4 space-y-4">
                        {replies.map((reply) => (
                            <CommentItem key={reply.id as string} comment={reply} replies={reply.replies} /> // Recursive call, ensuring replies are passed
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
