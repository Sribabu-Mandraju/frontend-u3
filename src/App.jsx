import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import ClientDetails from "./components/ClientDetails";
import ViewClientPdf from "./components/ViewClientPdf";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clients/:clientId" element={<ClientDetails />} />
        <Route path="/clients/pdf/:pdfUrl" element={<ViewClientPdf />} />
      </Routes>
    </>
  );
}

export default App;
