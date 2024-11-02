import { useEffect, useState } from "preact/hooks";
import { fetchJournalsByUserId } from "../actions/journal.ts";

const JournalListCards = ({ userId }: DashboardProps) => {
    const [journals, setJournals] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchJournalsByUserId(userId, setJournals, setError);
    }, []);

    const doubleJournal = journals.concat(journals);

    return (
        <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
            {doubleJournal.map((journal: Journal, index: number) => {
                const colorClass = iconColors[index % iconColors.length];
                const formattedDate = new Date(journal.created_at)
                    .toLocaleDateString();

                return (
                    <a
                        href={`/journal/${journal.id}`}
                        key={journal.id}
                        class="col-span-1 md:col-span-2 flex items-center space-x-4 p-6 bg-base-100 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div
                            class={`p-3 rounded-full text-white ${colorClass}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                class="w-8 h-8"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C8.1 2 5 5.1 5 9c0 4.5 5 11 7 13.1C12.8 20 19 13.4 19 9c0-3.9-3.1-7-7-7zm0 10.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 7.5 12 7.5s2.5 1.1 2.5 2.5S13.4 12.5 12 12.5z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold">
                                {journal.title}
                            </h3>
                            <p class="text-sm text-gray-500">
                                Updated: {formattedDate}
                            </p>
                        </div>
                    </a>
                );
            })}
        </div>
    );
};

export default JournalListCards;

interface DashboardProps {
    userId: string;
}

interface Journal {
    id: string;
    title: string;
    created_at: string;
}

const iconColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
];
