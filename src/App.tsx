import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import { UIProvider } from "./context/UIContext";
import GlobalLoadingOverlay from "./components/ui/GlobalOverlay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return <UIProvider>
    <RouterProvider router={router} />;
    <GlobalLoadingOverlay />
    <ToastContainer  position="bottom-right"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  draggable/> 
  </UIProvider>;
}

export default App;
