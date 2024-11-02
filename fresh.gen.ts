// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_journal from "./routes/api/journal.ts";
import * as $api_journals from "./routes/api/journals.ts";
import * as $countdown from "./routes/countdown.tsx";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $journal_id_ from "./routes/journal/[id].tsx";
import * as $search from "./routes/search.tsx";
import * as $Countdown from "./islands/Countdown.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Dashboard from "./islands/Dashboard.tsx";
import * as $JournalEntriesList from "./islands/JournalEntriesList.tsx";
import * as $JournalForm from "./islands/JournalForm.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/journal.ts": $api_journal,
    "./routes/api/journals.ts": $api_journals,
    "./routes/countdown.tsx": $countdown,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/journal/[id].tsx": $journal_id_,
    "./routes/search.tsx": $search,
  },
  islands: {
    "./islands/Countdown.tsx": $Countdown,
    "./islands/Counter.tsx": $Counter,
    "./islands/Dashboard.tsx": $Dashboard,
    "./islands/JournalEntriesList.tsx": $JournalEntriesList,
    "./islands/JournalForm.tsx": $JournalForm,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
