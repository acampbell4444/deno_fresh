import { Handlers } from "$fresh/server.ts";
import { supabase } from "../../db/supabaseClient.ts";

export const handler: Handlers = {
    async POST(req, _ctx) {
        const formData = await req.formData();
        const file = formData.get("file");
        const fileName = formData.get("name") as string;


        if (!file) {
            return new Response(JSON.stringify({ error: "file is required" }), {
                status: 400,
            });
        }

        try {
            const bucketName = 'journalPhotos';
    
            const { data, error } = await supabase
                .storage
                .from(bucketName)
                .upload(fileName, file);

            const urlFetchResponse = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(fileName);
        

        const s3Url = urlFetchResponse.data?.publicUrl;

        return new Response(JSON.stringify({ data: s3Url }), {
            status: 200,
        });

        } catch (error: any) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
            });
        }
        



    },
};
