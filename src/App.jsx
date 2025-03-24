import "./styles/app.scss";
import Dashboard from "./components/Dashboard";
import { GifProvider } from "./context/GifContext";

const App = () => {
  return (
    <>
      <GifProvider>
        <Dashboard />
      </GifProvider>
    </>
  );
};

export default App;
