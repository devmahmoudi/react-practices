import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { routes } from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import { fetchUsers } from "./features/userSlice";

const main = () => {
  store.dispatch(fetchUsers())

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </StrictMode>
  );
};

main();
