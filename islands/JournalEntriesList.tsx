import { useEffect, useState } from "preact/hooks";
import { fetchAllJournalEntriesById } from "../actions/journal.ts";
import { signal } from "@preact/signals";

// Define a global signal for the journal ID
// export const journalIdSignal = signal<string | null>(null);

const JournalEntriesList = ({ id }: JournalEntriesListProps) => {
    const [allEntries, setAllEntries] = useState<JournalEntry[]>([]);
    const [error, setError] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [lightboxUrl, setLightboxUrl] = useState<string | null>(null); // Lightbox state

    useEffect(() => {
        fetchAllJournalEntriesById(id, setAllEntries, setError);
    }, [id]);

    const toggleExpand = (entryId: string) => {
        setExpandedId(expandedId === entryId ? null : entryId);
    };

    const handleAddEntry = () => {
        globalThis.location.href = `/entry/0?journalId=${id}`;
    };

    const handleEditEntry = (entryId: string) => {
        globalThis.location.href = `/entry/${entryId}?journalId=${id}`;
    };

    return (
        <div class="p-4">
            <div class="flex items-center justify-between mb-4">
                <h1 class="text-2xl font-bold">Journal Entries</h1>
                <button
                    onClick={handleAddEntry}
                    class="flex items-center space-x-2 px-4 py-2 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg transform hover:scale-105 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-5H7v-2h4V7h2v3h4v2h-4v5z" />
                    </svg>
                    <span>Add Entry</span>
                </button>
            </div>

            {error && <p class="text-red-500">{error}</p>}

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {allEntries.map((entry, index) => {
                    const colorClass = iconColors[index % iconColors.length];
                    const formattedDate = new Date(entry.created_at).toLocaleDateString();

                    return (
                        <div
                            key={entry.id}
                            class={`p-4 rounded-lg shadow-lg bg-base-100 transition-all duration-300 hover:shadow-xl cursor-pointer ${
                                expandedId === entry.id ? "col-span-full" : "col-span-1"
                            }`}
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

                            {/* Tags Section */}
                            <div class="flex flex-wrap mt-3 gap-2">
                                {entry.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tag}
                                        class={`px-2 py-1 text-xs font-semibold text-gray-800 rounded-lg ${
                                            tagColors[tagIndex % tagColors.length]
                                        }`}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Expanded content with Photo Gallery */}
                            {expandedId === entry.id && (
                                <div class="mt-4 text-gray-700">
                                    <p>{entry.content}</p>
                                    
                                    {/* Photo Gallery */}
                                    {entry.photoUrls && entry.photoUrls.length > 0 && (
                                        <div class="grid grid-cols-2 gap-4 mt-4">
                                            {entry.photoUrls.map((url) => {
                                                console.log(url);   
                                                return (
                                                <img
                                                    height={150}
                                                    width={150} 
                                                    key={url}
                                                    src={url}
                                                    alt="Journal Entry Photo"
                                                    class="rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-200 shadow-md"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setLightboxUrl(url); // Open lightbox with image
                                                    }}
                                                />
                                            )})}
                                        </div>
                                    )}

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

            {/* Lightbox */}
            {lightboxUrl && (
                <div
                    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={() => setLightboxUrl(null)}
                >
                    <img src={lightboxUrl} alt="Enlarged view" class="max-w-full max-h-full rounded-lg shadow-lg" />
                    <button
                        onClick={() => setLightboxUrl(null)}
                        class="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default JournalEntriesList;

// Color themes for icons and tags
const iconColors = [
    "bg-blue-600",      // Dark Blue
    "bg-gray-700",      // Charcoal
    "bg-teal-600",      // Dark Teal
    "bg-indigo-700",    // Indigo
    "bg-gray-800",      // Dark Gray
    "bg-blue-800",      // Navy
    "bg-green-700",     // Forest Green
    "bg-purple-700",    // Deep Purple
];
  
const tagColors = [
    "bg-blue-300",      // Light Blue
    "bg-gray-300",      // Light Gray
    "bg-teal-300",      // Light Teal
    "bg-indigo-300",    // Soft Indigo
    "bg-gray-400",      // Medium Gray
    "bg-blue-400",      // Medium Blue
    "bg-green-400",     // Soft Green
    "bg-purple-300",    // Lavender
];

interface JournalEntriesListProps {
    id: string;
}

interface JournalEntry {
    id: string;
    title: string;
    content: string;
    created_at: string;
    tags: string[];
    photoUrls?: string[]; // Optional array of photo URLs
}
