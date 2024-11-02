import { useEffect, useState } from "preact/hooks";
import type { Signal } from "@preact/signals";
import JournalListCards from "../components/journalListCards.tsx";

const Dashboard = ({ userId }: DashboardProps) => {
  return <JournalListCards userId={userId} />;
};

export default Dashboard;
interface DashboardProps {
  userId: string;
}
