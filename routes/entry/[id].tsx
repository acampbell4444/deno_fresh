import { PageProps } from "$fresh/server.ts";
import JournalForm from "../../islands/JournalForm.tsx";
import Navbar from "../../islands/Navbar.tsx";

const JournalEntryDetail = (props: PageProps) => {

    return (
        <>
            <Navbar />
            <div class="max-w-screen-lg mx-auto flex justify-center">
                <JournalForm {...props} />
            </div>
        </>
    );
};

export default JournalEntryDetail;