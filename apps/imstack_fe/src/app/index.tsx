import React from "react";
import { Button } from "@/components/ui/button";

function App(): JSX.Element {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button size="sm">Login</Button>
      <textarea className="w-full h-svh border-spacing-0" />
    </>
  );
}

export default App;
