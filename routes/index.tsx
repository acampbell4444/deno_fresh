import { useSignal } from "@preact/signals";
import Dashboard from "../islands/Dashboard.tsx";
import Navbar from "../islands/Navbar.tsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <Dashboard userId="4044e0c9-b383-4239-9a97-75560e9c4ab1" />
      </div>
    </>
  );
};

export default Home;
