import { useState } from "react";
import "./App.css";
import Heading from "./components/heading";
import Section from "./components/section";
import type { AppConfig } from "./types";
import Counter from "./components/counter";

/**
 * App
 * @returns ReactElement
 */
function App({ config }: { config: AppConfig }) {
  /**
   * Counte state
   */
  const [count, setCount] = useState<number>(1);

  return (
    <div>
      <Heading
        title={config.heading.title}
        subTitle={config.heading.subTitle}
      />
      <div className="text-center">
        <Section title="Hell World !">
          <Counter setCount={setCount}>Count is {count}</Counter>
        </Section>
      </div>
    </div>
  );
}

export default App;
