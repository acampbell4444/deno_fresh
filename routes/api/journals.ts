// routes/api/firstEntry.ts
import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../db/supabaseClient.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("user_id");

    if (!userId) { return new Response(JSON.stringify({ error: "user_id is required" }), { status: 400 }); }

    const { data, error } = await supabase .from("journals") .select("*") .eq("user_id", userId);

    if (error) { return error }

    return new Response(JSON.stringify({ data }), {

    });
  },
};



// export const handler: Handlers = {
//   async GET(_req, _ctx) {
//     // Explicitly type the Supabase query with <JournalEntry>
//     const { data, error } = await supabase
//       .from("journal_entries")
//       .select("*")
//       .limit(1);

//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }

//     return new Response(JSON.stringify({ message: "Connection successful", data }), {
//       headers: { "Content-Type": "application/json" },
//     });
//   },
// };
