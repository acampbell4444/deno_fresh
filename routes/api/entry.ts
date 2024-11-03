import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../db/supabaseClient.ts";

export const handler: Handlers = {

    async GET(req, _ctx) {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return new Response(JSON.stringify({ error: "id is required" }), {
                status: 400,
            });
        }

        const { data, error } = await supabase
            .from("journal_entries")
            .select("*")
            .eq("id", id)
            // .single();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify({ data: data[0] }));
    },

    async POST(req) {
        const entry = await req.json();
        const { data, error } = await supabase
            .from("journal_entries")
            .insert(entry)
            .single();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ data }), { status: 200 });
    },

    async PUT(req) {
        const entry = await req.json();
        const { data, error } = await supabase
            .from("journal_entries")
            .update(entry)
            .eq("id", entry.id)
            .single();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ data }), { status: 200 });
    },
};

