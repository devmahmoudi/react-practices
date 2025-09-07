import { Helmet } from "react-helmet";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <Helmet>
        <title>
          Sticker Shop
        </title>
      </Helmet>
    </MainLayout>
  );
}

export default App;
