import { PageProps } from "$fresh/server.ts";
import JournalEntriesList from "../../islands/JournalEntriesList.tsx";
import Navbar from "../../islands/Navbar.tsx";

const Journal = (props: PageProps) => {
    const { id } = props.params;

    return (
        <>
            <Navbar />
            <div class="max-w-screen-lg mx-auto flex justify-center">
                <JournalEntriesList id={id} />
            </div>
        </>
    );
};

export default Journal;
