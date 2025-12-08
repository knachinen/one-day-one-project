import { getAllTags } from '@/features/ideas/actions';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface TagSelectorProps {
    selectedTags: string[];
    onTagChange: (tags: string[]) => void;
}

export async function TagSelector({ selectedTags, onTagChange }: TagSelectorProps) {
    const allTags = await getAllTags();

    const handleCheckedChange = (tagId: string, checked: boolean) => {
        if (checked) {
            onTagChange([...selectedTags, tagId]);
        } else {
            onTagChange(selectedTags.filter(id => id !== tagId));
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                    <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={`tag-${tag.id}`}
                            checked={selectedTags.includes(tag.id)}
                            onCheckedChange={(checked) => handleCheckedChange(tag.id, checked === true)}
                        />
                        <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
