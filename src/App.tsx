import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import GlobalLoadingOverlay from "./components/ui/GlobalOverlay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return <>
    <RouterProvider router={router} />
    <GlobalLoadingOverlay />
    <ToastContainer  position="bottom-right"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  draggable/> 
  </>
}

export default App;
