'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createUpdate } from '@/features/ideas/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef } from 'react';

interface UpdateFormProps {
    ideaId: string;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Submitting...' : 'Post Update'}
        </Button>
    );
}

export function UpdateForm({ ideaId }: UpdateFormProps) {
    const [state, formAction] = useFormState(createUpdate, { success: false, error: null });
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state.success]);

    return (
        <form ref={formRef} action={formAction} className="space-y-4">
            <input type="hidden" name="ideaId" value={ideaId} />
            <Input name="title" placeholder="Update Title" required />
            <Textarea name="content" placeholder="Describe the update..." required rows={6} />
            {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
            <SubmitButton />
        </form>
    );
}
