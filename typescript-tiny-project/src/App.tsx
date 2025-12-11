import "./App.css";
import Heading from "./components/heading";
import Section from "./components/section";
import type { AppConfig } from "./types";

/**
 * App
 * @returns ReactElement
 */
function App({ config }: { config: AppConfig }) {
  return (
    <div>
      <Heading
        title={config.heading.title}
        subTitle={config.heading.subTitle}
      />
      <div className="text-center">
        <Section title="Hell World !">
          <button>Click Me</button>
        </Section>
      </div>
    </div>
  );
}

export default App;
