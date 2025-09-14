import { Provider } from "react-redux";
import { AppRoutes } from "./routes";
import { store } from "./store";
import { Toaster } from "./shared/components/ui";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <Toaster />
    </Provider>
  );
}

export default App;
