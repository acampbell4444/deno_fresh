import { JournalEntryProps } from "../types/journal.tsx";
// import { supabase } from "../db/supabaseClient.ts";

export const fetchJournalsByUserId = async (
    userId: string,
) => {
    try {
        const response = await fetch(`/api/journals?user_id=${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch journals");
        }
        const result = await response.json();
        return result.data;
    } catch (err: any) {
        return err.message;
    }
};

export const fetchAllJournalEntriesById = async (
    id: string,
) => {
    try {
        const response = await fetch(`/api/journal?id=${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch journal");
        }
        const result = await response.json();
        return result.data;
    } catch (err: any) {
        return err.message;
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
