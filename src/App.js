import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomerRouter from "./Routers/CustomerRouter";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<CustomerRouter />} />
      </Routes>
      <div></div>
    </div>
  );
}

export default App;
