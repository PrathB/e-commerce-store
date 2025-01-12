import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerRouter from "./Routers/CustomerRouter";
import AdminRouter from "./Routers/AdminRouter";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<CustomerRouter />} />
        <Route path="/admin/*" element={<AdminRouter/>} />
      </Routes>
      <div></div>
    </div>
  );
}

export default App;
