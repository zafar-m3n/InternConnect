import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AuthSuccess from "./pages/AuthSuccess";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
