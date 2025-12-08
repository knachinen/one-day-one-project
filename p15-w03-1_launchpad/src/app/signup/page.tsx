'use client';

import { useActionState } from 'react';
import { signup } from '@/features/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SignupPage() {
    const [state, formAction] = useActionState(signup, null);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create a new account to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username">Username</label>
                            <Input id="username" name="username" placeholder="johndoe" required minLength={3} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password">Password</label>
                            <Input id="password" name="password" type="password" required minLength={6} />
                        </div>
                        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
                        <Button type="submit" className="w-full">Sign Up</Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account? <Link href="/login" className="underline">Login</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
