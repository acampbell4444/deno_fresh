import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

// interface CounterProps {
//   count: Signal<number>;
// }

interface DashboardProps {
  userId: String;
  // count: Signal<number>;
}

export default function Dashboard(props: DashboardProps) {
  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => console.log("hello world")}>
        Click Me I'm the dasbhboard
      </Button>
    </div>
  );
}
