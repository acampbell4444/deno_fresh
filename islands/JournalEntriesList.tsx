import { useEffect, useState } from "preact/hooks";
import { fetchAllJournalEntriesById } from "../actions/journal.ts";

const iconColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];

interface JournalFormProps {
    id: string;
}

interface JournalEntry {
    id: string;
    title: string;
    content: string;
    updated_at: string;
}

const JournalForm = ({ id }: JournalFormProps) => {
    const [allEntries, setAllEntries] = useState<JournalEntry[]>([]);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        console.log("fetching journal");
        fetchAllJournalEntriesById(id, setAllEntries, setError);
    }, [id]);

    const toggleExpand = (entryId: string) => {
        setExpandedId(expandedId === entryId ? null : entryId);
    };

    const handleAddEntry = () => {
        // Logic to handle adding a new entry
        console.log("Add new entry");
    };

    const handleEditEntry = (entryId: string) => {
        // Logic to handle editing the entry
        console.log(`Edit entry ${entryId}`);
    };

    return (
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <h1 class="text-2xl font-bold">Journal Entries</h1>
                <button 
                    onClick={handleAddEntry}
                    class="btn btn-primary"
                >
                    Add Entry
                </button>
            </div>

            {error && <p class="text-red-500">{error}</p>}
            
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {allEntries.map((entry, index) => {
                    const colorClass = iconColors[index % iconColors.length];
                    const formattedDate = new Date(entry.updated_at).toLocaleDateString();

                    return (
                        <div
                            key={entry.id}
                            class={`p-4 rounded-lg shadow-lg bg-base-100 transition-all duration-300 hover:shadow-xl cursor-pointer ${expandedId === entry.id ? "col-span-full" : "col-span-1"}`}
                            onClick={() => toggleExpand(entry.id)}
                        >
                            <div class="flex items-center space-x-4">
                                <div class={`p-3 rounded-full text-white ${colorClass}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        class="w-6 h-6"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C8.1 2 5 5.1 5 9c0 4.5 5 11 7 13.1C12.8 20 19 13.4 19 9c0-3.9-3.1-7-7-7zm0 10.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 7.5 12 7.5s2.5 1.1 2.5 2.5S13.4 12.5 12 12.5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold">{entry.title}</h3>
                                    <p class="text-sm text-gray-500">Updated: {formattedDate}</p>
                                </div>
                            </div>
                            
                            {expandedId === entry.id && (
                                <div class="mt-4 text-gray-700">
                                    <p>{entry.content}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent collapsing on click
                                            handleEditEntry(entry.id);
                                        }}
                                        class="flex items-center mt-4 space-x-2 text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            class="w-4 h-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.7 7.3l-4-4a1 1 0 00-1.4 0l-10 10a1 1 0 00-.3.7V18a1 1 0 001 1h3.3a1 1 0 00.7-.3l10-10a1 1 0 000-1.4zM9 17H7v-2l8-8 2 2-8 8z" />
                                        </svg>
                                        <span>Edit</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default JournalForm;
