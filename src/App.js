import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./admin/layout";

import "./index.css";
import "antd/dist/antd.css";
import { AdminProduct } from "./admin/product";
import { CategoryPage } from "./page/phone";
import { Layouts } from "./page/layout";
import { Home } from "./page/home";
import { Order } from "./page/order";
import { AdminOrder } from "./admin/order";
import { ProductId } from "./page/productId";
const App = () => {
  const getLenghtBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) return 0;
    if (Array.isArray(basket)) return basket.length;
    return 1;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layouts get={getLenghtBasket} />}>
          <Route index element={<Home />} />
          <Route path="order" element={<Order />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductId />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route path="product" element={<AdminProduct />} />
          <Route path="order" element={<AdminOrder />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
