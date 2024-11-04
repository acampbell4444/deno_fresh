import { useEffect, useState } from "preact/hooks";
import { fetchJournalsByUserId } from "../actions/journal.ts";

const JournalDashboard = ({ userId }: DashboardProps) => {
    const [journals, setJournals] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!userId) return;
        fetchJournalsByUserId(userId)
        .then((fetchedJournals) => {
            setJournals(fetchedJournals);
            setIsLoading(false);
        })
        .catch((err) => { setError(err.message); });
    }, [userId]);

    // Dummy data for other sections
    const documents = [
        { id: 1, name: "Custody Agreement Draft", date: "10/31/24" },
        { id: 2, name: "Financial Report 2024", date: "10/25/24" },
        { id: 3, name: "Court Submission", date: "10/20/24" },
    ];

    const notifications = [
        { id: 1, message: "Court submission deadline approaching.", date: "11/02/24" },
        { id: 2, message: "New message from attorney.", date: "11/01/24" },
        { id: 3, message: "Document review needed.", date: "10/30/24" },
    ];

    return (
        <div class="max-w-6xl mx-auto p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Journals Section */}
            <section class="col-span-2 lg:col-span-3">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-white">Your Journals</h2>
                    <p class="text-gray-400">
                        {isLoading ? "Loading..." : `${journals.length} journals found`}
                    </p>
                </div>
                {error && (
                    <div class="text-red-500 bg-red-100 p-4 rounded mb-6">
                        Error loading journals: {error}
                    </div>
                )}
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {isLoading ? (
                        <div class="col-span-full text-center text-gray-500">
                            Loading journals...
                        </div>
                    ) : (
                        journals.map((journal: Journal, index: number) => {
                            const colorClass = iconColors[index % iconColors.length];
                            const formattedDate = new Date(journal.created_at).toLocaleDateString();

                            return (
                                <a
                                    href={`/journal/${journal.id}`}
                                    key={journal.id}
                                    class="flex flex-col justify-between p-6 bg-gray-800 text-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div class="flex items-center mb-4">
                                        <div class={`p-3 rounded-full text-white ${colorClass}`}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                class="w-8 h-8"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2C8.1 2 5 5.1 5 9c0 4.5 5 11 7 13.1C12.8 20 19 13.4 19 9c0-3.9-3.1-7-7-7zm0 10.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 7.5 12 7.5s2.5 1.1 2.5 2.5S13.4 12.5 12 12.5z" />
                                            </svg>
                                        </div>
                                        <h3 class="ml-4 text-lg font-semibold">{journal.title}</h3>
                                    </div>
                                    <p class="text-sm text-gray-400">Updated: {formattedDate}</p>
                                </a>
                            );
                        })
                    )}
                </div>
            </section>

            {/* Current Documents Section */}
            <section class="bg-gray-800 text-white p-6 shadow-md rounded-lg">
                <h3 class="text-xl font-semibold mb-4">Current Documents</h3>
                <ul>
                    {documents.map(doc => (
                        <li key={doc.id} class="mb-4">
                            <p class="font-medium">{doc.name}</p>
                            <p class="text-sm text-gray-400">Last Updated: {doc.date}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Notifications Section */}
            <section class="bg-gray-800 text-white p-6 shadow-md rounded-lg">
                <h3 class="text-xl font-semibold mb-4">Notifications</h3>
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id} class="mb-4">
                            <p>{notification.message}</p>
                            <p class="text-sm text-gray-400">Date: {notification.date}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Calendar Section (Placeholder) */}
            <section class="bg-gray-800 text-white p-6 shadow-md rounded-lg">
                <h3 class="text-xl font-semibold mb-4">Upcoming Events</h3>
                <div class="text-gray-400">
                    <p>No events scheduled this week.</p>
                </div>
            </section>
        </div>
    );
};

export default JournalDashboard;

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
