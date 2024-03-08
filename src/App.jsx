import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import ClientDetails from "./components/clients/ClientDetails";
import ViewClientPdf from "./components/documents/ViewClientPdf";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clients/:clientId" element={<ClientDetails />} />
        <Route path="/clients/pdf/:id" element={<ViewClientPdf />} />
      </Routes>
    </>
  );
}

export default App;
