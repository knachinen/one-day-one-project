'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createComment } from '@/features/ideas/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef } from 'react';

interface CommentFormProps {
    ideaId: string;
    parentId?: string | null; // New: Optional parentId
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Submitting...' : 'Post Comment'}
        </Button>
    );
}

export function CommentForm({ ideaId }: CommentFormProps) {
    const [state, formAction] = useFormState(createComment, { success: false, error: null });
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state.success]);

    return (
        <form ref={formRef} action={formAction} className="space-y-4">
            <input type="hidden" name="ideaId" value={ideaId} />
            <Textarea name="content" placeholder="Write a comment..." required rows={4} />
            {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
            <SubmitButton />
        </form>
    );
}
