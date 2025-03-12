import "./App.css";
import TasksPage from "./pages/TasksPage";
import WelcomePage from "./pages/WelcomePage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <WelcomePage /> */}
      <TasksPage />
    </QueryClientProvider>
  );
}

export default App;
