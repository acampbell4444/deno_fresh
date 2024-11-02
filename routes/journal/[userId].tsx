import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(req, ctx) {
      return await ctx.render();
    },
    async POST(req, ctx) {
      const form = await req.formData();
      console.log('dormDdata', form);
      const entry = form.get("entry");

      console.log(entry);
  
      // Add email to list.
  
      // Redirect user to thank you page.
      const headers = new Headers();
    //   headers.set("location", "/thanks-for-subscribing");
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    },
  };
const Journal = (props: PageProps) => {


    return (
        <div style={{ width: "100%" }}>
            <div>
                Hello {props.params.userId}
            </div>

            <form method="post">

                <input type="email" name="email" value="" />

                <div className="w-full max-w-3xl mx-auto my-6">
                    <textarea
                        name="entry"
                        placeholder={"Write your entry here..."}
                        className="textarea textarea-bordered w-full h-[36rem]"
                        value={'lkasdjfkldslkfj'}
                    >
                    </textarea>
                </div>

                <button type="submit">Save</button>

            </form>
        </div>
    );
};

export default Journal;
