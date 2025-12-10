import { CreateIdeaForm } from "@/features/ideas/create-form";
import { getAllTags } from "@/features/ideas/actions"; // Import getAllTags

export default async function NewIdeaPage() { // Make it async
    const allTags = await getAllTags(); // Fetch tags here

    return (
        <div className="container py-10">
            <CreateIdeaForm allTags={allTags} /> {/* Pass tags as prop */}
        </div>
    );
}
