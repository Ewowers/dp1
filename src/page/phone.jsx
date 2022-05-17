import { Row, Col, Breadcrumb, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../component/card";

export const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  let param;
  switch (category) {
    case "videoCard":
      param = "Видео Карта";
      break;
    case "processor":
      param = "Тип процессора";
      break;
    case "motherboard":
      param = "Материнская плата";
      break;
    case "powerSupply":
      param = "Блок питания";
      break;
  }
  const onAlert = () => {
    message.success("Товар добавлен в карзину");
  };
  useEffect(() => {
    axios.get("/api/product/category=" + category).then((res) => setProducts(res.data));
  }, []);
  return (
    <Row justify="center">
      <Col md={20}>
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Главное</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{param}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={24} style={{ display: "flex", gap: 10 }}>
            {products.map((item) => (
              // <Card key={item._id} style={{ width: 280 }}>
              //   <img src={item.image[0]} width="100%" height={280} />
              //   <p style={{ fontSize: 18 }}>
              //     <strong>{item.title}</strong>
              //   </p>
              //   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              //     <p style={{ margin: 0 }}>₸{item.prise}</p>
              //     <Button onClick={onAlert}>
              //       <ShoppingCartOutlined />
              //     </Button>
              //   </div>
              // </Card>
              <Card item={item} key={item._id} />
            ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
