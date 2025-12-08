import { getIdeas, IdeaWithAuthor } from '@/features/ideas/actions';
import { IdeaCard } from './idea-card';

export async function IdeaList() {
    const ideas: IdeaWithAuthor[] = await getIdeas();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
            ))}
        </div>
    );
}
