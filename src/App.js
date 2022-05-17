import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./admin/layout";

import "./index.css";
import "antd/dist/antd.css";
import { AdminProduct } from "./admin/product";
import { CategoryPage } from "./page/phone";
import { Layouts } from "./page/layout";
import { Home } from "./page/home";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="category/:category" element={<CategoryPage />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route path="product" element={<AdminProduct />} />
          <Route path="user" element={<AdminProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
