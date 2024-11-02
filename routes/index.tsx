import { useSignal } from "@preact/signals";
import Dashboard from "../islands/Dashboard.tsx";

export default function Home() {
  return (
    <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
      <img
        class="my-6"
        src="/logo.png"
        width="400"
        height="400"
        alt="the Fresh logo: a sliced lemon dripping with juice"
      />

      <Dashboard userId="123" />
    </div>
  );
}
