import { AppRouter } from "./router";
import { AppProvider } from "./provider";
import "./index.css";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
