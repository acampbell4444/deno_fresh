import { useSignal } from "@preact/signals";
import Dashboard from "../islands/Dashboard.tsx";

const Index = () => {


  return (
    <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">

      <img class="my-6" src="/logo.png" width="100" height="100" alt="the Fresh logo: a sliced lemon dripping with juice" />

      <Dashboard userId="4044e0c9-b383-4239-9a97-75560e9c4ab1" />



    </div>
  );
}

export default Index; 
