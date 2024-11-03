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