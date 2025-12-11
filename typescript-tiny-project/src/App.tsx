import "./App.css";
import Heading from "./components/heading";
import type { AppConfig } from "./types";

/**
 *
 * @returns
 */
function App({ config }: { config: AppConfig }) {
  return (
    <div>
      <Heading
        title={config.heading.title}
        subTitle={config.heading.subTitle}
      />
    </div>
  );
}

export default App;
