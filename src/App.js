import { BrowserRouter } from "react-router-dom";
import "./assets/css/global.css";
import ShopTemplate from "./components/templates/ShopTemplate/ShopTemplate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <div className="min-h-[100vh] z-0 ">
          <div className="content ">
            <ShopTemplate />
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
