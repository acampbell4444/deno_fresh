export interface JournalEntryProps {
    id: string | undefined
    title: string;
    content: string;
    created_at: string | undefined;
    tags: string[];
    journal_id: string;
    photoUrls: string[];
}