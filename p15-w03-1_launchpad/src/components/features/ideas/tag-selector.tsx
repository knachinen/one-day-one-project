import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Tag {
    id: string;
    name: string;
}

interface TagSelectorProps {
    allTags: Tag[]; // New: Accept allTags as prop
    selectedTags: string[];
    onTagChange: (tags: string[]) => void;
}

export function TagSelector({ allTags, selectedTags, onTagChange }: TagSelectorProps) { // Removed async
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
