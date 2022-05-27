import { Row, Col, Breadcrumb } from "antd";
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
          <Col span={24} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 50 }}>
            {products.map((item) => (
              <Card item={item} key={item._id} />
            ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
