import { getCommentsForIdea, CommentWithAuthor } from '@/features/ideas/actions';
import { CommentItem } from './comment-item'; // Import CommentItem
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Still needed for CommentItem's internal rendering


interface CommentListProps {
    ideaId: string;
}

export async function CommentList({ ideaId }: CommentListProps) {
    const comments = await getCommentsForIdea(ideaId);

    // Build a hierarchical structure
    const commentMap = new Map<string, CommentWithAuthor & { replies: (CommentWithAuthor & { replies: any[] })[] }>();
    comments.forEach(comment => {
        commentMap.set(comment.id as string, { ...comment, replies: [] });
    });

    const rootComments: (CommentWithAuthor & { replies: (CommentWithAuthor & { replies: any[] })[] })[] = [];
    comments.forEach(comment => {
        if (comment.parentId) {
            const parent = commentMap.get(comment.parentId as string);
            if (parent) {
                parent.replies.push(commentMap.get(comment.id as string)!);
            }
        } else {
            rootComments.push(commentMap.get(comment.id as string)!);
        }
    });

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
            {rootComments.length === 0 ? (
                <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            ) : (
                rootComments.map((comment) => (
                    <CommentItem key={comment.id as string} comment={comment} replies={comment.replies} />
                ))
            )}
        </div>
    );
}
