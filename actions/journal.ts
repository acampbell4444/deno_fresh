export const fetchJournalsByUserId = async (
    userId: string,
    setJournals: any,
    setError: any,
) => {
    try {
        const response = await fetch(`/api/journals?user_id=${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch journals");
        }
        const result = await response.json();
        setJournals(result.data);
    } catch (err: any) {
        setError(err.message);
    }
};

export const fetchAllJournalEntriesById = async (
    id: string,
    setAllEntries: any,
    setError: any,
) => {
    try {
        const response = await fetch(`/api/journal?id=${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch journal");
        }
        const result = await response.json();
        setAllEntries(result.data);
    } catch (err: any) {
        setError(err.message);
    }
}
