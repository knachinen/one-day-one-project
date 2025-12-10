'use client';

import { useActionState } from 'react';
import { createIdea } from '@/features/ideas/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TagSelector } from '@/components/features/ideas/tag-selector'; // Import TagSelector
import { useState } from 'react'; // Import useState

interface Tag {
    id: string;
    name: string;
}

interface CreateIdeaFormProps {
    allTags: Tag[];
}

export function CreateIdeaForm({ allTags }: CreateIdeaFormProps) {
    const [state, formAction] = useActionState(createIdea, null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // State for selected tags

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Share Your Idea</CardTitle>
                <CardDescription>Tell us about your next big thing.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <Input id="title" name="title" placeholder="Project Name" required />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="tagline" className="text-sm font-medium">Tagline</label>
                        <Input id="tagline" name="tagline" placeholder="A short, catchy description (150 chars max)" required maxLength={150} />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">Category</label>
                        <Select name="category" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SaaS">SaaS</SelectItem>
                                <SelectItem value="Mobile App">Mobile App</SelectItem>
                                <SelectItem value="Web Service">Web Service</SelectItem>
                                <SelectItem value="Tool">Tool</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        {/* Tag Selector */}
                        <TagSelector allTags={allTags} selectedTags={selectedTags} onTagChange={setSelectedTags} />
                        {/* Hidden inputs to pass selected tags to server action */}
                        {selectedTags.map(tagId => (
                            <input key={tagId} type="hidden" name="tags[]" value={tagId} />
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Problem & Solution</label>
                        <textarea
                            id="description"
                            name="description"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Describe the problem you are solving and your proposed solution..."
                            required
                        />
                    </div>

                    {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

                    <Button type="submit" className="w-full">Submit Idea</Button>
                </form>
            </CardContent>
        </Card>
    );
}
