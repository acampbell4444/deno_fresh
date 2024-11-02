import { PageProps } from "$fresh/server.ts";
import { useEffect, useState } from "preact/hooks";
import JournalEntriesList from "../../islands/JournalEntriesList.tsx";

const Journal = (props: PageProps) => {
    const id = props.params.id;
    console.log('props.params', props.params.id)


    return (
     <JournalEntriesList id={id} />
    );
};

export default Journal;
