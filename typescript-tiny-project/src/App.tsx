import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Heading from "./assets/components/heading";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Heading title="Typescript & React tutorial" subTitle="Mahdi Mahmoudi" />
    </div>
  );
}

export default App;
