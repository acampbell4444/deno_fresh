import { JournalEntryProps } from "../types/journal.tsx";
// import { supabase } from "../db/supabaseClient.ts";

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
};

export const fetchJournalEntryById = async (
    id: string,
) => {
    try {
        const response = await fetch(`/api/entry?id=${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch journal");
        }
        const result = await response.json();
        return result.data;
    } catch (err: any) {
        return err.message;
    }
};

export const saveJournalEntry = async (entry: JournalEntryProps) => {
    try {
        const isNew = entry.id == "0";
        console.log("isNew", isNew);
        const body = {...entry}
        if(isNew) {
            delete body.id;
            delete body.created_at;
        }
        const response = await fetch(`/api/entry/${isNew ? "" : `?id=${entry.id}`}`, {
            method: !isNew? "PUT" : "POST",
            body: JSON.stringify(body),
        });

        console.log(response);

        if (!response.ok) {
            throw new Error("Failed to save journal entry");
        }

        const result = await response.json();
        return result.data; // Return saved data if needed
    } catch (err: any) {
        return err.message;
    }
};
